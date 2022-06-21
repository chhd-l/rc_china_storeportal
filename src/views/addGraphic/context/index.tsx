import React from 'react';
import { WxArticle, Asset } from "@/framework/types/wechat";
import { uuid } from "@/utils/utils";

interface IGrapicContext {
  articleList: WxArticle[]
  currentArticleId: string
  onChangeFieldValue: (values: { [T in keyof WxArticle]?: WxArticle[T] }) => void
  setCurrentArticleId: (id: string) => void
  setArticleList: (articleList: WxArticle[]) => void
}

export const createDefaultArticle: (type: "image" | "voice" | "video" | "news") => WxArticle = (type) => ({
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

export function getCurrentArticleById(articleList: WxArticle[], id: string): WxArticle | undefined {
  return articleList.find(article => article.id === id);
}

export function transArticleList(articleList: WxArticle[]): any {
  const imgStr = (imgList: any) => imgList.map((img: any) => `<img src="${img.picture}" />`).join("");
  const voiceStr = (voice: any) => `<audio controls><source src="${voice.voice}" /></audio>`;
  const videoStr = (video: any) => `<video controls><source src="${video.video}" type="video/mp4" /></video>`;
  return articleList.map((article) => ({
    id: article.id,
    title: article.title,
    type:article.type,
    thumbMediaId: article.thumbMedia.assetId,
    thumbUrl: article.thumbMedia.assetLink,
    thumbPic: article.thumbMedia.picture,
    author: article.author,
    digest: article.digest,
    showCoverPic: article.thumbMedia.assetId ? 1 : 0,
    content: article.type === "image" ? `<div>${imgStr(article.imageList)}</div>` : article.type === "video" ? `<div>${videoStr(article.video)}</div>` : article.type === "voice" ? `<div>${voiceStr(article.voice)}</div>` : article.content,
    contentSourceURL: article.contentSourceURL,
  }));
}

export function moveArticleList(articleList: WxArticle[], articleId: string, direction: "up" | "down"): WxArticle[] {
  const article = getCurrentArticleById(articleList, articleId);
  const articleIdx = articleList.findIndex(article => article.id === articleId);
  if (!article || articleList.length < 2 || (articleIdx < 1 && direction === "up") || (articleIdx === articleList.length - 1 && direction === "down")) {
    return articleList;
  }
  articleList.splice(articleIdx, 1);
  articleList.splice(direction === "up" ? articleIdx - 1 : articleIdx + 1, 0, article);
  return articleList;
}

export default GraphicContextProvider;
