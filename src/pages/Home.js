import React, { Component } from 'react';
import axios from 'axios';
import { api, post } from '../helpers/keys';
import moment from 'moment';
import Article from '../components/article';

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
            if(item){
                item.key = i;
                item.timecode = moment.unix(item.time).fromNow();
                return( <Article {...item}/> );
            }
            // Set some additional keys to add to our article
            
        });
        return articles;
    }

    render(){
        return(
            <section className="content">
                    {this.mapArticles()}
                    <div className="loadmore" onClick={() => this.getAdditionalArticles()}>
                        <h1>{this.state.articleNumber >= 500 ? "No more articles available." : "Load more articles"}</h1>
                    </div>
            </section>
        )
    }
}

export default HomePage;