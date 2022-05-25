import React from 'react';
import { GraphicContext } from "../context";

const Preview: React.FC = () => {
  const { articleList, currentArticleId } = React.useContext(GraphicContext);

  return (
    <div className="preview-container">
      {
        articleList.map((article, idx) => (
          <div className={`preview-item ${article.id === currentArticleId ? 'active' : ''}`} key={idx}>
            <div className="title">{article.title}</div>
          </div>
        ))
      }
      <div className="add-new">+ Add a new message</div>
    </div>
  )
}

export default Preview
