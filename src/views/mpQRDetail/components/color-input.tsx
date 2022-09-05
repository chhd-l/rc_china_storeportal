import React from 'react';
import { SketchPicker } from "react-color";
import { Input, Popover } from "antd";
import intl from 'react-intl-universal';

interface IProps {
  value?: string
  onChange?: (val: string) => void
}

const ColorInput: React.FC<IProps> = ({ value, onChange }) => {
  const [color, setColor] = React.useState<any>(value ? JSON.parse(value) : { r: 0, g: 0, b: 0, a: 1 });

  const handleChangeColor = (color: any) => {
    const { a, ...rest } = color.rgb;
    setColor(color.rgb);
    onChange && onChange(JSON.stringify(rest));
  }

  return (
    <Popover placement="right" content={<SketchPicker color={color} disableAlpha={true} onChange={handleChangeColor} />} trigger="click">
      <Input readOnly value={value} placeholder={intl.get('public.select')} />
    </Popover>
  );
}

export default ColorInput
