import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Comment = (props) => {
    return(
        <div className="comment">
            <div className="comment--meta">
                <p><Link to={`/users/${props.by}`}>{props.by}</Link><span> - {props.timecode}</span></p>
            </div>
            <div className="comment--data" dangerouslySetInnerHTML={props.comment}>
            </div>
            {props.kids ? <button className="commentbox active"><FontAwesomeIcon icon="plus"/> {props.kids.length} comments</button> : null}
        </div>
    )
}

export default Comment;