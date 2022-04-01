import ChooseCate from "./components/ChooseCate";
import MainInfo from "./components/MainInfo";
import { useState } from "react";

const Product = () => {
  const [cateInfo, setCateInfo] = useState(null);
  const handleCate = (value: any) => {
    if (value) {
      setCateInfo(value);
    }
  };
  return (
    <div>
      {!cateInfo && <ChooseCate handleCate={handleCate} />}
      {cateInfo && <MainInfo cateInfo={cateInfo} />}
    </div>
  );
};

export default Product;
