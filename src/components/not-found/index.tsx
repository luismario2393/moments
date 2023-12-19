import { ContainerNotFound } from "./style";
import { CustomLink, Typography } from "..";
import { TypographyType } from "../../state/emun";

function NotFound() {
  return (
    <ContainerNotFound>
      <Typography type={TypographyType.HeadlineH2} text="404 - Not Found" />
      <Typography
        type={TypographyType.BodyMedium}
        text="Oops! Parece que la página que estás buscando no existe."
      />

      <CustomLink to={"/home"}> ¿Quieres volver a inicio?</CustomLink>
    </ContainerNotFound>
  );
}

export default NotFound;
