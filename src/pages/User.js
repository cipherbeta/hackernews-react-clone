import React, { Component } from 'react';
import axios from 'axios';
import { user } from '../helpers/keys';

class UserPage extends Component { 
    state = {
        userData: {}
    }

    componentDidMount(){
        this.getUserInfo();
    }

    getUserInfo = () => {
        axios
        .get(`${user}/${this.props.match.params.id}.json`)
        .then(user => {
            console.log(user);
        })
    }

    render(){
        return(
            <div className="content">
                userpage
            </div>
        )
    }
}

export default UserPage;