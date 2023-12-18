import styled from "styled-components";

export const CardMoments = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3fr 1fr;

  border-radius: 4px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);

  min-width: 330px;
  max-width: 500px;
  height: 600px;
`;
interface IContainerImage {
  src: string;
}

export const ContainerImage = styled.div<IContainerImage>`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`;
export const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
  padding: 20px;

  @media (max-width: 768px) {
    margin-top: 20px;
    border-left: none;
  }
`;
export const ContainerUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

interface IContainerbuttons {
  isLiked: string;
  isShared: string;
}

export const ContainerButtons = styled.div<IContainerbuttons>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  .button-like {
    ${({ isLiked, theme }) =>
      isLiked === "true" &&
      `

      background-color: ${theme.brand.primaryDark};
    `}
    .anticon {
      color: ${({ theme }) => theme.brand.primaryDark};
      ${({ isLiked, theme }) =>
        isLiked === "true" &&
        `
      color: ${theme.platform.white};
    `}

      transition: color 0.3s ease-in-out;

      &:hover {
        color: ${({ theme }) => theme.platform.black};
        transition: color 0.3s ease-in-out;
        ${({ isLiked, theme }) =>
          isLiked === "true" &&
          `
      color: ${theme.platform.white};
    `}
      }
    }
  }
  .button-share {
    ${({ isShared, theme }) =>
      isShared === "true" &&
      `
      background-color: ${theme.brand.primaryDark};
    `}
    .anticon {
      color: ${({ theme }) => theme.brand.primaryDark};
      ${({ isShared, theme }) =>
        isShared === "true" &&
        `
      color: ${theme.platform.white};
    `}

      transition: color 0.3s ease-in-out;

      &:hover {
        color: ${({ theme }) => theme.platform.black};
        transition: color 0.3s ease-in-out;
        ${({ isShared, theme }) =>
          isShared === "true" &&
          `
      color: ${theme.platform.white};
    `}
      }
    }
  }
`;
