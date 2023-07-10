// Article.jsx
import React from 'react';

function Article(props) {
    return (
        <article className="col-md-9">
            <h2 id={props.id}><strong>{props.title}</strong></h2>
            {/* rest of the code related to article */}
            {/* you can further break this down */}
        </article>
    );
}
export default Article;