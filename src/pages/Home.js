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
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
})

class HomePage extends Component {
    state = {
        articles: []
    }

    componentDidMount(){
        if(this.state.articles.length < 1){
            this.getArticles();
        } 
    }

    getArticles = () => {
        axios
            .get(`${api}topstories.json`)
            .then(items => {
                let articles = items.data;
                let init = articles.slice(0,50);
                init.forEach(item => {
                    axios
                        .get(`${post}${item}.json`)
                        .then(article => {
                            this.setState({ articles: [...this.state.articles, article.data]});
                        });
                })
            });
    }

    mapArticles = () => {
        let articles = this.state.articles.map((item, i) => {
            return(
                <Article className="article" key={i}>
                    <div className="article--title">
                        <h1><Link to={`/${item.id}`}>{item.title}</Link></h1>
                    </div>
                    <div className="article--meta">
                        {item.type} by {item.by}
                    </div>
                </Article>
            )
        });
        return articles;
    }

    render(){
        console.log(this.state.articles);
        return(
            <section className="content">
                <PoseGroup>
                    {this.mapArticles()}
                </PoseGroup> 
            </section>
        )
    }
}

export default HomePage;