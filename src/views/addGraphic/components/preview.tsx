import React from 'react';
import { Dropdown, Menu } from 'antd';
import { GraphicContext, createDefaultArticle } from "../context";
import _ from 'lodash';

const Preview: React.FC = () => {
  const { articleList, currentArticleId, setCurrentArticleId, setArticleList } = React.useContext(GraphicContext);

  const handleCreateNewMessage = (type: "image" | "voice" | "video" | "news") => {
    const newArticle = createDefaultArticle(type);
    articleList.push(newArticle);
    setArticleList(_.cloneDeep(articleList));
    setCurrentArticleId(newArticle.id);
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span onClick={() => handleCreateNewMessage("news")}>New graphic</span>
      </Menu.Item>
      <Menu.Item key="1">
        <span onClick={() => handleCreateNewMessage("image")}>Picture message</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span onClick={() => handleCreateNewMessage("voice")}>Voice message</span>
      </Menu.Item>
      <Menu.Item key="3">
        <span onClick={() => handleCreateNewMessage("video")}>Video message</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="preview-container">
      {
        articleList.map((article, idx) => (
          <div className={`preview-item ${article.id === currentArticleId ? 'active' : ''}`} key={idx}>
            <div className="image">
              {article.thumbMedia?.picture ? <img src={article.thumbMedia.picture} /> : null}
            </div>
            <div className="title">{article.title}</div>
          </div>
        ))
      }
      <Dropdown overlay={menu}>
        <div className="add-new">+ Add a new message</div>
      </Dropdown>
    </div>
  )
}

export default Preview
