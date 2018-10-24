import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Article = (props) => {
    return(
        <div className="article">
            <Link className="article--link" to={`/posts/${props.id}`}/>
            <div className="article--score">
                <FontAwesomeIcon icon="angle-up"/>
                <p>{props.score}</p>
                <FontAwesomeIcon icon="angle-down"/>
            </div>
            <div className="article--content">
                <div className="article--title">
                    <h1>{props.title}</h1>
                </div>
                <div className="article--meta">
                    <Link to={`/users/${props.by}`}>{props.by}</Link> posted {props.timecode}. {props.descendants ? `${props.descendants} comments.` : null} 
                </div>
            </div>
            <div className="article--external">
                <a href={props.link} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon="external-link-alt"/>
                </a>
                
            </div>
        </div>
    )
}

export default Article;