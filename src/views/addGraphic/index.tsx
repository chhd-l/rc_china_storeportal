import React, { useState, useEffect } from 'react';
import { ContentContainer } from '@/components/ui';
import { WxArticle } from "@/framework/types/wechat";
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
import intl from 'react-intl-universal';

import "./index.less";

const NewGraphic: React.FC = () => {
  const [articleList, setArticleList] = useState<WxArticle[]>([]);
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

  // useEffect(() => {
  //   formRef.current = null;
  // }, [currentArticleId]);

  const onChangeFieldValue = (values: { [T in keyof WxArticle]?: WxArticle[T] }) => {
    const _articleList = articleList.map((item: WxArticle) => {
      if (item.id === currentArticleId) {
        item = Object.assign({}, item, values);
      }
      return item;
    });
    setArticleList(_.cloneDeep(_articleList));
  }

  const handleValidate: () => Promise<boolean> = () => {
    if(article?.type === "news"){
      var regular = /^(https?:\/\/)?-((\w+)+(\.\w+)*)-((\.[a-z]+)*)-((\/\w+)*)-(\?\w+\=([\w\u4e00-\u9fa5!@#\$%\^&\*\(\)_\+]+)(&\w+\=([\w\u4e00-\u9fa5!@#\$%\^&\*\(\)_\+]+))*)?-(#\w+)?$/
      console.log(regular.test(article.contentSourceURL))
    }
    if (!article?.thumbMedia?.assetId) {
      message.warn({className:"rc-message", content: intl.get('wx.pls_upload_thumb')});
      return Promise.resolve(false);
    }
    if (article.type !== "news" && !article.imageList?.length && !article.video?.assetId && !article.voice?.assetId) {
      message.warn({className:"rc-message", content: intl.get('wx.pls_upload_asso_assets')});
      return Promise.resolve(false);
    }
    if(article.type === "news"){
      var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/
      console.log(article)
    }
    return new Promise((resolve) => {
      formRef.current?.form?.validateFields().then(() => {
        resolve(true);
      }).catch(() => {
        resolve(false);
      })
    });
  }

  const handleSave = async () => {
    const success = await handleValidate();
    if (success) {
      console.log(articleList,999)
      const param = transArticleList(articleList);
      console.log(param,8888)
      setLoading(true);
      const res = await addArticle(param);
      setLoading(false);
      if (res?.id) {
        navigator("/assets/assets-management", { state: "news" });
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
        navigator("/assets/assets-management", { state: "news" });
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
              <Button disabled={loading}onClick={() => navigator("/assets/assets-management", { state: "news" })} >{intl.get('public.cancel')}</Button>
              <Button loading={loading} type="primary" onClick={handleSave}>{intl.get('public.save')}</Button>
              <Button loading={loading} type="primary" onClick={handleSaveAndSync}>{intl.get('wx.save_and_sync')}</Button>
            </div>
          </div>
        </div>
      </GraphicContentProvider>
    </ContentContainer>
  )
}

export default NewGraphic;
