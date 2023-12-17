import { TypographyType as StyleTypographyType } from "./style";
import "../../index.css";
import { TypographyType } from "../../state/emun";

interface NameProps {
  className?: string;
  type?: TypographyType;
  text?: string;
}

const typography = {
  [TypographyType.HeadlineH2]: (props: NameProps) => (
    <StyleTypographyType.HeadlineH2 className={props.className}>
      {props.text}
    </StyleTypographyType.HeadlineH2>
  ),
  [TypographyType.SubtitleLarge]: (props: NameProps) => (
    <StyleTypographyType.SubtitleLarge className={props.className}>
      {props.text}
    </StyleTypographyType.SubtitleLarge>
  ),
  [TypographyType.SubtitleMedium]: (props: NameProps) => (
    <StyleTypographyType.SubtitleMedium className={props.className}>
      {props.text}
    </StyleTypographyType.SubtitleMedium>
  ),
  [TypographyType.BodyMedium]: (props: NameProps) => (
    <StyleTypographyType.BodyMedium className={props.className}>
      {props.text}
    </StyleTypographyType.BodyMedium>
  ),
  [TypographyType.Caption]: (props: NameProps) => (
    <StyleTypographyType.Caption className={props.className}>
      {props.text}
    </StyleTypographyType.Caption>
  ),
  [TypographyType.Buttons]: (props: NameProps) => (
    <StyleTypographyType.Buttons className={props.className}>
      {props.text}
    </StyleTypographyType.Buttons>
  ),
};

const Typography = (props: NameProps) => {
  return typography[props.type || TypographyType.HeadlineH2](props);
};

export default Typography;
