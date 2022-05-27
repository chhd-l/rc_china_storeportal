import React, { useState, useEffect } from 'react';
import { ContentContainer } from '@/components/ui';
import { Article } from "@/framework/types/wechat";
import Preview from './components/preview';
import NewArticle from './components/new-article';
import NewPicture from './components/new-picture';
import NewVoice from './components/new-voice';
import NewVideo from './components/new-video';
import GraphicContentProvider, { createDefaultArticle, getCurrentArticleById, transArticleList }  from './context';
import { Button, message } from 'antd';
import { addArticle, addAndSyncArticle } from "@/framework/api/wechatSetting";
import _ from 'lodash';
import { useNavigate } from "react-router-dom";

import "./index.less";

const NewGraphic: React.FC = () => {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [currentArticleId, setCurrentArticleId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const formRef = React.useRef<any>();
  const article = getCurrentArticleById(articleList, currentArticleId);
  const navigator = useNavigate();

  useEffect(() => {
    const initialArticle = createDefaultArticle("news");
    setArticleList([initialArticle]);
    setCurrentArticleId(initialArticle.id);
  }, []);

  useEffect(() => {
    formRef.current = null;
  }, [currentArticleId]);

  const onChangeFieldValue = (values: { [T in keyof Article]?: Article[T] }) => {
    const _articleList = articleList.map((item: Article) => {
      if (item.id === currentArticleId) {
        item = Object.assign({}, item, values);
      }
      return item;
    });
    setArticleList(_.cloneDeep(_articleList));
  }

  const handleValidate: () => Promise<boolean> = () => {
    if (!article?.thumbMedia?.assetId) {
      message.warn({className:"rc-message", content: "Please upload thumbnail picture!"});
      return Promise.resolve(false);
    }
    if (article.type !== "news" && !article.imageList?.length && !article.video?.assetId && !article.voice?.assetId) {
      message.warn({className:"rc-message", content: "Please upload associate asset!"});
      return Promise.resolve(false);
    }
    return new Promise((resolve) => {
      formRef.current?.form?.validateFields().then(() => {
        onChangeFieldValue({ content: formRef.current.form.getFieldValue("content") ?? "" });
        resolve(true);
      }).catch(() => {
        resolve(false);
      })
    });
  }

  const handleSave = async () => {
    const success = await handleValidate();
    if (success) {
      const param = transArticleList(articleList);
      setLoading(true);
      const res = await addArticle(param);
      setLoading(false);
      if (res?.id) {
        navigator("/assets-management", { state: "news" });
      }
    }  
  }

  const handleSaveAndSync = async () => {
    const success = await handleValidate();
    if (success) {
      const param = transArticleList(articleList);
      setLoading(true);
      const res = await addAndSyncArticle(param);
      setLoading(false);
      if (res?.id) {
        navigator("/assets-management", { state: "news" });
      }
    }  
  }

  return (
    <ContentContainer>
      <GraphicContentProvider
        value={{
          articleList,
          currentArticleId,
          onChangeFieldValue,
          setCurrentArticleId,
          setArticleList
        }}
      >
        <div className="flex justify-start">
          <div className="pt-6 mr-4">
            <Preview onValidate={handleValidate} />
          </div>
          <div className="flex-grow p-4 ml-4">
            {article?.type === "news"
              ? <NewArticle key={article.id} ref={formRef} />
              : article?.type === "image"
              ? <NewPicture key={article.id} ref={formRef} />
              : article?.type === "voice"
              ? <NewVoice key={article.id} ref={formRef} />
              : article?.type === "video" ? <NewVideo key={article.id} ref={formRef} /> : null}
            <div className="mt-4 text-right space-x-4">
              <Button disabled={loading}>Cancel</Button>
              <Button loading={loading} type="primary" onClick={handleSave}>Save</Button>
              <Button loading={loading} type="primary" onClick={handleSaveAndSync}>Save and Sync</Button>
            </div>
          </div>
        </div>
      </GraphicContentProvider>
    </ContentContainer>
  )
}

export default NewGraphic;
