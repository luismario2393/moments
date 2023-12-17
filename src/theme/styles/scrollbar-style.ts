import { css } from "styled-components";

export const scrollbarStyle = css`
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: white;
    background-color: ${({ theme }) => theme.platform.grayscaleBorders};
    border-radius: 8px;

    &:hover {
      cursor: pointer;
    }
  }
`;
