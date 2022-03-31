import { Button } from "antd";
import React from "react";

interface ResetBtnGroupProps {
  back: Function;
  loading: boolean;
  disabled: boolean;
  next?: Function;
  classes?: string;
}

//自定义reset password page的 button
const ResetBtnGroup = ({
  back,
  loading,
  disabled,
  next,
  classes,
}: ResetBtnGroupProps) => {
  return (
    <div className={`${classes} flex flex-row justify-between my-10`}>
      <Button
        htmlType="button"
        className="w-5/12"
        danger
        onClick={() => {
          back && back();
        }}
      >
        Back
      </Button>
      <Button
        htmlType="submit"
        className="w-5/12"
        type="primary"
        loading={loading}
        danger
        disabled={disabled}
        onClick={(e) => {
          next && next();
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default ResetBtnGroup
