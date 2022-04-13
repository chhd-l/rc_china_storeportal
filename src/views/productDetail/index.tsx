import ChooseCate from "./components/ChooseCate";
import MainInfo from "./components/MainInfo";
import { useState } from "react";
import Demo from "./components/Demo";
import { ContentContainer } from "@/components/ui";

const Product = () => {
  const [cateInfo, setCateInfo] = useState(null);
  const handleCate = (value: any) => {
    if (value) {
      setCateInfo(value);
    }
  };
  return (
    <ContentContainer>
      {/* <Demo />*/}
      {!cateInfo && <ChooseCate handleCate={handleCate} />}
      {cateInfo && <MainInfo cateInfo={cateInfo} />}
    </ContentContainer>
  );
};

export default Product;
