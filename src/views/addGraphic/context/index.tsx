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

// id: article.id,
// title: article.title,
// thumbMediaId: article.thumbMedia.assetId,
// thumbUrl: article.thumbMedia.assetLink,
// author: article.author,
// digest: article.digest,
// showCoverPic: article.showCoverPic || 0,
// content: article.content,
// contentSourceURL: article.contentSourceURL,

export function transArticleList(articleList: Article[]): any {
  const imgStr = (imgList: any) => imgList.map((img: any) => `<img src="${img.assetLink}" />`).join("");
  const voiceStr = (voice: any) => `<audio controls><source src="${voice.assetLink}" /></audio>`;
  const videoStr = (video: any) => `<video controls><source src="${video.assetLink}" type="video/mp4" /></video>`;
  return articleList.map((article) => ({
    id: article.id,
    title: article.title,
    thumbMediaId: article.thumbMedia.assetId,
    thumbUrl: article.thumbMedia.assetLink,
    author: article.author,
    digest: article.digest,
    showCoverPic: article.thumbMedia.assetId ? 1 : 0,
    content: article.type === "image" ? `<div>${imgStr(article.imageList)}</div>` : article.type === "video" ? `<div>${videoStr(article.video)}</div>` : article.type === "voice" ? `<div>${article.voice}</div>` : article.content,
    contentSourceURL: article.contentSourceURL,
  }));
}

export default GraphicContextProvider;
