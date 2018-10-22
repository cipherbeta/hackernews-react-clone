import React, { Component } from 'react';
import axios from 'axios';
import { api, post } from '../helpers/keys';
import { Link } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

let ArticleWrapper = posed.div({
    enter: { opacity: 1, staggerChildren: 50 },
    exit: { opacity: 0 }
})

let Article = posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 1 }
})

class HomePage extends Component {
    state = {
        articles: [],
        loading: false,
    }

    componentDidMount(){
        if(this.state.articles.length < 1){
            this.getArticles();
        } 
    }

    getArticles = () => {
        axios
            .get(`${api}/topstories.json`)
            .then(items => {
                let articles = items.data;
                let init = articles.slice(0,50);
                init.forEach(item => {
                    axios
                        .get(`${post}/${item}.json`)
                        .then(article => {
                            this.setState({ articles: [...this.state.articles, article.data]});
                        });
                })
            });
    }

    mapArticles = () => {
        let articles = this.state.articles.map((item, i) => {
            return(
                <section className="article" key={i}>
                    <Link className="article--link" to={`/${item.id}`}/>
                    <div className="article--score">
                        <p>{item.score}</p>
                    </div>
                    <div className="article--content">
                        <div className="article--title">
                            <h1>{item.title}</h1>
                        </div>
                        <div className="article--meta">
                            {item.type} by {item.by}. {item.descendants ? `${item.descendants} comments.` : null} 
                        </div>
                    </div>
                </section>
            )
        });
        return articles;
    }

    render(){
        return(
            <section className="content">
                    {this.mapArticles()}
                    <div className="loadmore">
                        <h1>{this.state.loading ? "Loading..." : "Click to load more."}</h1>
                    </div>
            </section>
        )
    }
}

export default HomePage;