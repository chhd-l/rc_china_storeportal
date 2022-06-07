import React from 'react';
import { Dropdown, Menu, message } from 'antd';
import { GraphicContext, createDefaultArticle, moveArticleList } from "../context";
import { openConfirmModal } from "@/utils/utils";
import _ from 'lodash';

interface IProps {
  onValidate: () => Promise<boolean>
}

const Preview: React.FC<IProps> = ({ onValidate }) => {
  const { articleList, currentArticleId, setCurrentArticleId, setArticleList } = React.useContext(GraphicContext);

  const handleCreateNewMessage = (type: "image" | "voice" | "video" | "news") => {
    onValidate().then(success => {
      if (success) {
        const newArticle = createDefaultArticle(type);
        articleList.push(newArticle);
        setArticleList(_.cloneDeep(articleList));
        setCurrentArticleId(newArticle.id);
      }
    })    
  }

  const handleSelectMessage = async (id: string) => {
    const check = await onValidate();
    if (check) {
      setCurrentArticleId(id);
    }
  } 

  const handleDeleteMessage = () => {
    const _articleList = articleList.filter(art => art.id !== currentArticleId);
    setArticleList(_.cloneDeep(_articleList));
    setCurrentArticleId(_articleList[0].id);
  }

  const confirmDelete = () => {
    if (articleList.length < 2) {
      message.warn({className:"rc-message", content: "Single message cannot be deleted!"});
      return;
    }
    openConfirmModal({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this message",
      onOk: handleDeleteMessage
    })
  }

  const handleMoveArticle = (direction: "up" | "down") => {
    const _articleList = moveArticleList(articleList, currentArticleId, direction);
    setArticleList(_.cloneDeep(_articleList));
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={() => handleCreateNewMessage("news")}>New graphic</div>
      </Menu.Item>
      <Menu.Item key="1">
        <div onClick={() => handleCreateNewMessage("image")}>Picture message</div>
      </Menu.Item>
      <Menu.Item key="2">
        <div onClick={() => handleCreateNewMessage("voice")}>Voice message</div>
      </Menu.Item>
      <Menu.Item key="3">
        <div onClick={() => handleCreateNewMessage("video")}>Video message</div>
      </Menu.Item>
    </Menu>
  );

  const articleIdx = articleList.findIndex(ar => ar.id === currentArticleId);
  return (
    <div className="preview-container">
      {
        articleList.map((article, idx) => (
          <div className={`preview-item ${article.id === currentArticleId ? 'active' : ''}`} key={idx} onClick={() => handleSelectMessage(article.id)}>
            <div className="image">
              {article.thumbMedia?.picture ? <img src={article.thumbMedia.picture} /> : null}
            </div>
            <div className="title">{article.title}</div>
          </div>
        ))
      }
      {articleList.length < 8 ? <Dropdown overlay={menu} trigger={["click"]}>
        <div className="add-new">+ Add a new message</div>
      </Dropdown> : null}
      <div className="action">
        {articleIdx > 0 ? <div className="cursor-pointer" onClick={() => handleMoveArticle("up")}><span className="iconfont icon-Frame-21 text-xl"></span></div> : null}
        {articleIdx < articleList.length - 1 ? <div className="cursor-pointer" onClick={() => handleMoveArticle("down")}><span className="iconfont icon-Frame-31 text-xl"></span></div> : null}
        {articleList.length > 1 ? <div className="cursor-pointer" onClick={confirmDelete}><span className="iconfont icon-delete text-xl" /></div> : null}
      </div>
    </div>
  )
}

export default Preview
