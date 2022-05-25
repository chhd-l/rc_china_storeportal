import React, { useState } from 'react';
import { ContentContainer } from '@/components/ui';
import { Article } from "@/framework/types/wechat";
import Preview from './components/preview';
import NewArticle from './components/new-article';
import GraphicContentProvider, { initialContext }  from './context';
import _ from 'lodash';

import "./index.less";

const NewGraphic: React.FC = () => {
  const [articleList, setArticleList] = useState<Article[]>(initialContext.articleList);
  const [currentArticleId, setCurrentArticleId] = useState<string>(initialContext.currentArticleId);

  const onChangeFieldValue = (values: { [T in keyof Article]?: Article[T] }) => {
    const _articleList = articleList.map((item: Article) => {
      if (item.id === currentArticleId) {
        Object.assign(item, values);
      }
      return item;
    });
    setArticleList(_.cloneDeep(_articleList));
  }

  return (
    <ContentContainer>
      <GraphicContentProvider
        value={{
          articleList,
          currentArticleId,
          onChangeFieldValue,
          setCurrentArticleId
        }}
      >
        <div className="flex justify-start">
          <div className="pt-6 mr-4">
            <Preview />
          </div>
          <div className="flex-grow p-4 ml-4">
            <NewArticle />
          </div>
        </div>
      </GraphicContentProvider>
    </ContentContainer>
  )
}

export default NewGraphic;
