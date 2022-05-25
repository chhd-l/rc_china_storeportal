import React, { useState } from 'react';
import { ContentContainer } from '@/components/ui';
import Preview from './components/preview';
import NewArticle from './components/new-article';

import "./index.less";

const NewGraphic: React.FC = () => {
  return (
    <ContentContainer>
      <div className="flex justify-start">
        <div className="pt-6 mr-4" style={{width: 300}}>
          <Preview />
        </div>
        <div className="flex-grow p-4 ml-4">
          <NewArticle />
        </div>
      </div>
    </ContentContainer>
  )
}

export default NewGraphic;
