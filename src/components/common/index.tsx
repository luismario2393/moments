import styled from "styled-components";

export const ContainerLink = styled.div`
  margin: 20px 0 0 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  .anticon {
    color: ${({ theme }) => theme.brand.primaryDark};
  }
`;

export const ContainerButton = styled.div`
  margin-top: 50px;
  width: 300px;
  transition: 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    width: 310px;
    transition: 0.3s ease-in-out;
  }
`;
