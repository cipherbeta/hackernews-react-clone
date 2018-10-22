import React, {Component} from 'react';
import { post } from '../helpers/keys';
import axios from 'axios';

class PostPage extends Component {
    state = {
        pageContent: {}
    }

    componentDidMount(){
        axios
            .get(post + this.props.match.url + '.json')
            .then(item => {
                console.log(item.data);
            })
    }

    render(){
        console.log(this.props);
        return(
            <section className="content">
                test
            </section>
        )
    }
}

export default PostPage;