import React, { useState, useEffect } from 'react';
import { ContentContainer } from '@/components/ui';
import { Article } from "@/framework/types/wechat";
import Preview from './components/preview';
import NewArticle from './components/new-article';
import NewPicture from './components/new-picture';
import NewVoice from './components/new-voice';
import NewVideo from './components/new-video';
import GraphicContentProvider, { createDefaultArticle, getCurrentArticleById }  from './context';
import { Button } from 'antd';
import { addArticle } from "@/framework/api/wechatSetting";
import _ from 'lodash';

import "./index.less";

const NewGraphic: React.FC = () => {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [currentArticleId, setCurrentArticleId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const initialArticle = createDefaultArticle("news");
    setArticleList([initialArticle]);
    setCurrentArticleId(initialArticle.id);
  }, []);

  const onChangeFieldValue = (values: { [T in keyof Article]?: Article[T] }) => {
    const _articleList = articleList.map((item: Article) => {
      if (item.id === currentArticleId) {
        item = Object.assign({}, item, values);
      }
      return item;
    });
    setArticleList(_.cloneDeep(_articleList));
  }

  const handleSave = async () => {
    const param = articleList.map(article => ({
      id: article.id,
      title: article.title,
      thumbMediaId: article.thumbMedia.assetId,
      thumbUrl: article.thumbMedia.assetLink,
      author: article.author,
      digest: article.digest,
      showCoverPic: article.showCoverPic || 0,
      content: article.content,
      contentSourceURL: article.contentSourceURL,
    }));
    setLoading(true);
    await addArticle(param);
    setLoading(false);
  }

  const article = getCurrentArticleById(articleList, currentArticleId);
  console.log("redernnnnnnnnnnnn:", articleList);
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
            <Preview />
          </div>
          <div className="flex-grow p-4 ml-4">
            {article?.type === "news"
              ? <NewArticle />
              : article?.type === "image"
              ? <NewPicture />
              : article?.type === "voice"
              ? <NewVoice />
              : article?.type === "video" ? <NewVideo /> : null}
            <div className="mt-4 text-right space-x-4">
              <Button disabled={loading}>Cancel</Button>
              <Button loading={loading} type="primary" onClick={handleSave}>Save</Button>
              <Button loading={loading} type="primary">Save and Sync</Button>
            </div>
          </div>
        </div>
      </GraphicContentProvider>
    </ContentContainer>
  )
}

export default NewGraphic;
