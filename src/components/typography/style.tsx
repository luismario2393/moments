import styled from "styled-components";

const margin = `margin: 0`;

export const TypographyType = {
  HeadlineH2: styled.h2`
    color: ${({ theme }) => theme.platform.black};
    ${margin};
    font-family: Lexend;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 25px;
  `,
  SubtitleLarge: styled.h2`
    color: ${({ theme }) => theme.platform.black};
    ${margin};
    font-family: Lexend;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
  `,
  SubtitleMedium: styled.h2`
    color: ${({ theme }) => theme.platform.black};
    ${margin};
    font-family: Lexend;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17.5px;
  `,
  BodyMedium: styled.h3`
    color: ${({ theme }) => theme.platform.black};
    ${margin};
    font-family: Lexend;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17.5px;
  `,
  Caption: styled.p`
    color: ${({ theme }) => theme.platform.black};
    ${margin};
    font-family: Lexend;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
  `,
  Buttons: styled.span`
    color: ${({ theme }) => theme.platform.black};
    ${margin};
    font-family: Lexend;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
  `,
};
