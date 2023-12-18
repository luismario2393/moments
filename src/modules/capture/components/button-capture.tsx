import { FC, ReactNode } from "react";
import { Button } from "../../../components";
import { ButtonType } from "../../../state/emun";
import { Tooltip } from "antd";

interface ButtonCaptureProps {
  children: ReactNode;
  onClick: () => void;
  show: boolean | null;
  titleTooltip: string;
}

const ButtonCapture: FC<ButtonCaptureProps> = ({
  children,
  onClick,
  show,
  titleTooltip,
}) => {
  return (
    show &&
    show === true && (
      <Tooltip placement="top" title={titleTooltip} arrow={true}>
        <Button customType={ButtonType.secondary} onClick={onClick}>
          {children}
        </Button>
      </Tooltip>
    )
  );
};

export default ButtonCapture;
