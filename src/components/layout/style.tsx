import styled from "styled-components";

interface IContainer {
  children: React.ReactNode;
  center?: string;
}

export const Container = styled.div<IContainer>`
  margin: 0 auto;
  max-width: 700px;
  ${({ center }) =>
    center === "true" &&
    `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`;
