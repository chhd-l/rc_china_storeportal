import React from 'react';
import { Article } from "@/framework/types/wechat";
import { uuid } from "@/utils/utils";

interface IGrapicContext {
  articleList: Article[]
  currentArticleId: string
  onChangeFieldValue: (values: { [T in keyof Article]?: Article[T] }) => void
  setCurrentArticleId: (id: string) => void
}

const defaultArticle: Article = {
  id: uuid(),
  title: "",
  thumbMediaId: "",
  thumbUrl: "",
  author: "",
  digest: "",
  showCoverPic: 0,
  content: "",
  contentSourceURL: "",
}

export const initialContext: IGrapicContext = {
  articleList: [{...defaultArticle}],
  currentArticleId: defaultArticle.id,
  onChangeFieldValue: () => {},
  setCurrentArticleId: () => {}
}

export const GraphicContext = React.createContext<IGrapicContext>(initialContext);

const GraphicContextProvider: React.FC<{ value: IGrapicContext, children: React.ReactElement }> = ({ value, children }) => {
  return <GraphicContext.Provider value={value}>
    {children}
  </GraphicContext.Provider>
}

export function getCurrentArticleById(articleList: Article[], id: string): Article | undefined {
  return articleList.find(article => article.id === id);
}

export default GraphicContextProvider;
