import { ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";

interface CustomPanelTitleProps {
  showBackArrow?: boolean;
  backArrow?: Function;
  title?: string;
}

//自定义panel title
const CustomPanelTitle = ({
  showBackArrow = false,
  backArrow,
  title = "Reset Password",
}: CustomPanelTitleProps) => {
  return (
    <>
      {/* {showBackArrow ? (
        <p className="text-left mb-0">
          <ArrowLeftOutlined
            style={{ color: "rgba(239, 68, 68,1)", fontSize: "24px" }}
            onClick={() => {
              backArrow && backArrow();
            }}
          />
        </p>
      ) : null} */}
      {/* <p className={`text-2xl font-medium ${showBackArrow ? "-mt-4" : ""}`}> */}
      <p className={`text-2xl font-medium mb-6 text-center`}>
        {title}
      </p>
    </>
  );
};
export default CustomPanelTitle;
