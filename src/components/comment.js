import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { post } from '../helpers/keys';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import moment from 'moment';

class Comment extends Component {
    state = {
        childCommentsToggled: false,
        childComments: []
    }

    componentDidMount(){
        if(this.props.kids && this.props.kids.length > 0){
            this.getChildComments();
        }
    }

    getChildComments = () => {
        this.props.kids.forEach(item => {
            axios
                .get(`${post}/${item}.json`)
                .then(comment => {
                    console.log(comment);
                    this.setState({childComments: [...this.state.childComments, comment.data]});
                })

        })
    }

    generateChildComments = () => {
        let comments = this.state.childComments.map((item, i) => {
            // Sanitize HTML before dangerously setting innerhtml to help prevent XSS attacks.
            let sanitizedHTML = DOMPurify.sanitize(item.text);
            // Set some additional keys to pass to our comment element.
            item.key = i;
            item.comment = {__html: sanitizedHTML};
            item.timecode = moment.unix(item.time).fromNow();
            return( <Comment {...item}/> );
        })
        return comments;
    }

    toggleChildComments = () => {
        this.setState({childCommentsToggled: !this.state.childCommentsToggled});
    }

    render(){
        return(
            <div className="comment">
                <div className="comment--meta">
                    <p><Link to={`/users/${this.props.by}`}>{this.props.by}</Link><span> - {this.props.timecode}</span></p>
                </div>
                <div className="comment--data" dangerouslySetInnerHTML={this.props.comment}>
                </div>
                {
                this.props.kids ? 
                <>
                    <button className={"commentbox" + (this.state.childCommentsToggled ? " active" : "")} onClick={()=>this.toggleChildComments()}>
                        <FontAwesomeIcon icon="plus"/> {this.props.kids.length} comments
                    </button> 
                    {
                        this.state.childCommentsToggled ?
                            <div className="comment--childbox">
                                {this.generateChildComments()}
                            </div>
                        :
                            null
                    }
                    
                </>
                : 
                    null
                }
                
            </div>
        )
    }
}

export default Comment;