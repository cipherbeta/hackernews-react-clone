import React, { Component } from 'react';
import axios from 'axios';
import { api, post } from '../helpers/keys';
import { Link } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

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
        articleIDs: [],
        articles: [],
        loading: false,
        loadNumber: 20,
        articleNumber: 0
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
                let articleIDs = items.data;
                this.setState({ articleIDs });
                let init = articleIDs.slice(0,this.state.loadNumber);
                this.setState({ articleNumber: this.state.loadNumber })
                init.forEach(item => {
                    axios
                        .get(`${post}/${item}.json`)
                        .then(article => {
                            this.setState({ articles: [...this.state.articles, article.data]});
                        });
                })
            });
    }

    getAdditionalArticles = () => {
        let num = this.state.loadNumber;
        let base = this.state.articleNumber;
        console.log(`Loading articles from ${base} to ${base + num}`);
        let init = this.state.articleIDs.slice(base, (base + num));
        this.setState({loadNumber: (this.state.loadNumber + this.state.loadNumber)})
        init.forEach(item => {
            axios
                .get(`${post}/${item}.json`)
                .then(article => {
                    this.setState({ articles: [...this.state.articles, article.data]});
                });
        })
    }

    mapArticles = () => {
        let articles = this.state.articles.map((item, i) => {
            let time = moment.unix(item.time).fromNow();
            return(
                <section className="article" key={i}>
                    <Link className="article--link" to={`/posts/${item.id}`}/>
                    <div className="article--score">
                        <FontAwesomeIcon icon="angle-up"/>
                        <p>{item.score}</p>
                        <FontAwesomeIcon icon="angle-down"/>
                    </div>
                    <div className="article--content">
                        <div className="article--title">
                            <h1>{item.title}</h1>
                        </div>
                        <div className="article--meta">
                            {item.by} posted {time}. {item.descendants ? `${item.descendants} comments.` : null} 
                        </div>
                    </div>
                    <div className="article--external">
                        <a href={item.link} target="_blank">
                            <FontAwesomeIcon icon="external-link-alt"/>
                        </a>
                        
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
                    <div className="loadmore" onClick={() => this.getAdditionalArticles()}>
                        <h1>{this.state.loading ? "Loading..." : "Load more articles"}</h1>
                    </div>
            </section>
        )
    }
}

export default HomePage;