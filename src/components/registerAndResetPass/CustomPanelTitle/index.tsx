import { ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";

//自定义panel title
const CustomPanelTitle = ({
  showBackArrow = false,
  backArrow,
  title = "Reset Password",
}: any) => {
  return (
    <>
      {showBackArrow ? (
        <p className="text-left mb-0">
          <ArrowLeftOutlined
            style={{ color: "rgba(239, 68, 68,1)", fontSize: "24px" }}
            onClick={() => {
              backArrow && backArrow();
            }}
          />
        </p>
      ) : null}
      <p className={`text-xl font-medium ${showBackArrow ? "-mt-4" : ""}`}>
        {title}
      </p>
    </>
  );
};
export default CustomPanelTitle;
