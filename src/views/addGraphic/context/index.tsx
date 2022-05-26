import React from 'react';
import { Article, Asset } from "@/framework/types/wechat";
import { uuid } from "@/utils/utils";

interface IGrapicContext {
  articleList: Article[]
  currentArticleId: string
  onChangeFieldValue: (values: { [T in keyof Article]?: Article[T] }) => void
  setCurrentArticleId: (id: string) => void
  setArticleList: (articleList: Article[]) => void
}

export const createDefaultArticle: (type: "image" | "voice" | "video" | "news") => Article = (type) => ({
  id: uuid(),
  title: "",
  type: type,
  thumbMedia: {},
  author: "",
  digest: "",
  showCoverPic: 0,
  content: "",
  contentSourceURL: "",
})

const initialContext: IGrapicContext = {
  articleList: [{...createDefaultArticle("news")}],
  currentArticleId: "",
  onChangeFieldValue: () => {},
  setCurrentArticleId: () => {},
  setArticleList: () => {},
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

// export function transImageList(imageList: Partial<Asset>): string {
//   const imgStr = (imageList || []).map((item: Asset) => `<img src="${item.}"`)
// }

export default GraphicContextProvider;
