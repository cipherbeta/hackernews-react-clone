import React, {Component} from 'react';
import { post } from '../helpers/keys';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PostPage extends Component {
    state = {
        pageContent: {}
    }

    componentDidMount(){
        this.getPostMeta();
    }

    getPostMeta = () => {
        axios
        .get(post + this.props.match.url + '.json')
        .then(item => {
            let pageContent = item.data;
            console.log(pageContent)
            this.setState({pageContent});
        })
    }

    render(){
        console.log(this.props);
        let c = this.state.pageContent
        return(
            <section className="content">
                <div className="post-meta">
                    <div className="post-meta--score">
                        <p>{c.score}</p>
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
            </section>
        )
    }
}

export default PostPage;