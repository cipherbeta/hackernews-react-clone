import React, {Component} from 'react';
import { post } from '../helpers/keys';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

class PostPage extends Component {
    state = {
        pageContent: {},
        comments: []
    }

    componentDidMount(){
        this.getPostMeta();
        
    }

    getPostMeta = () => {
        axios
        .get(`${post}/${this.props.match.params.id}.json`)
        .then(item => {
            let pageContent = item.data;
            this.setState({pageContent});
            
            this.getComments();
        });
        
    }

    getComments = () => {
        if(Object.keys(this.state.pageContent).length){
            if(this.state.pageContent.kids){
                this.state.pageContent.kids.forEach(item => {
                    axios
                    .get(`${post}/${item}.json`)
                    .then(item => {
                        this.setState({comments: [...this.state.comments, item.data]});
                    });
                })
            }
            
        }
    }

    // TODO: Generate child comments, and make an alternative for unix time so I don't have to 
    // include the bloat that is moment.js, ech
    generateCommentsList = () => {
        let comments = this.state.comments.map((item, i) => {
            let comment = {__html: item.text};
            let time = moment.unix(item.time).fromNow();
            return(
                <div className="comment" key={i}>
                    <div className="comment--meta">
                        <p>{item.by}<span> - {time}</span></p>
                    </div>
                    <div className="comment--data" dangerouslySetInnerHTML={comment}>
                    </div>
                </div>
            )
        })
        return comments;
    }

    render(){
        let c = this.state.pageContent
        return(
            <section className="content">
                <div className="post-meta">
                    <div className="post-meta--score">
                        <FontAwesomeIcon icon="angle-up"/>
                        <p>{c.score}</p>
                        <FontAwesomeIcon icon="angle-down"/>
                    </div>
                    <div className="post-meta--content">
                        <div className="post-meta--title">
                            <h1>{c.title}</h1>
                        </div>
                        <div className="post-meta--meta">
                            {c.type} by {c.by}. {c.descendants ? `${c.descendants} comments.` : null} 
                        </div>
                    </div>
                    <div className="post-meta--link">
                        <a href={c.url} target="_blank" rel="noopener noreferrer">
                        LINK TO ARTICLE <FontAwesomeIcon icon="external-link-alt"/></a>
                    </div>
                </div>
                <div className="comments">
                    {this.generateCommentsList()}
                </div>
            </section>
        )
    }
}

export default PostPage;