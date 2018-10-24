import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Comment = (props) => {
    return(
        <div className="comment" key={props.key}>
            <div className="comment--meta">
                <p>{props.by}<span> - {props.timecode}</span></p>
            </div>
            <div className="comment--data" dangerouslySetInnerHTML={props.comment}>
            </div>
            {props.kids ? <button className="commentbox"><FontAwesomeIcon icon="plus"/> {props.kids.length} comments</button> : null}
        </div>
    )
}

export default Comment;