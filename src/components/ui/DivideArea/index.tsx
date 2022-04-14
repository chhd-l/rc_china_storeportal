import cn from "classnames";
import React, { FC } from "react";

interface Props {
  className?: string;
}

const DivideArea: FC<Props> = ({ className }) => {
  const rootClassName = cn(className);

  return <div className={`h-5 ${rootClassName}`}></div>;
};

export default DivideArea;
