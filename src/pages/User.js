import React, { Component } from 'react';
import axios from 'axios';
import { user, post } from '../helpers/keys';
import moment from 'moment';
import Comment from '../components/comment';
import DOMPurify from 'dompurify';

class UserPage extends Component { 
    state = {
        userData: {},
        comments: [],
        posts: []
    }

    componentDidMount(){
        this.getUserInfo();
    }

    getUserInfo = () => {
        axios
        .get(`${user}/${this.props.match.params.id}.json`)
        .then(user => {
            let userData = user.data;
            console.log(userData);
            this.setState({userData});
        })
        .then(() => {
            this.getUserPosts();
        })
    }

    getUserPosts = () => {
        this.state.userData.submitted.forEach(element => {
            axios
            .get(`${post}/${element}.json`)
            .then(item => {
                /* 
                    TODO: Both stories and comments are handled under the same
                    array, so we'll have to put together something to sort the
                    two out and map them to an article & comment respectfully.
                */
                this.setState({comments: [...this.state.comments, item.data]});
            })
        });
    }

    generateCommentsList = () => {
        let comments = this.state.comments.map((item, i) => {
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

    render(){
        console.log('comments' + this.state.comments);
        return(
            <div className="content">
                userpage
            </div>
        )
    }
}

export default UserPage;