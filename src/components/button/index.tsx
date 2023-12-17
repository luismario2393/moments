import { FC } from "react";
import { ButtonProps as AntdButtonProps } from "antd";
import { ButtonPrimary, ButtonSecondary } from "./style";
import { ButtonType } from "../../state/emun";

export interface ButtonProps extends AntdButtonProps {
  customType?: ButtonType;
}

const buttons = {
  [ButtonType.primary]: (props: AntdButtonProps) => (
    <ButtonPrimary {...props} />
  ),
  [ButtonType.secondary]: (props: AntdButtonProps) => (
    <ButtonSecondary {...props} />
  ),
};

const Button: FC<ButtonProps> = ({ customType, ...antdProps }) => {
  return buttons[customType || ButtonType.primary](antdProps);
};

export default Button;
