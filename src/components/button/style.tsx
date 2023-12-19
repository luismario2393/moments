import styled from "styled-components";
import { Button as AntdButton } from "antd";

const Button = styled(AntdButton)`
  border-radius: 4px;
  font-family: "Lexend";
  border: 0px;
  padding: 10px 20px;
  color: ${({ theme }) => theme.platform.white};
  height: 44px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  box-shadow: none;
  transition: none;
  :disabled {
    cursor: not-allowed;
  }
`;

export const ButtonPrimary = styled(Button)`
  background: ${({ theme }) => theme.brand.primaryDark};
  color: ${({ theme }) => theme.platform.white};

  :disabled {
    background: ${({ theme }) => theme.brand.primaryDark};
    color: ${({ theme }) => theme.brand.primaryDark};
  }
`;

export const ButtonSecondary = styled(Button)`
  background-color: ${({ theme }) => theme.platform.white};
  border: 1px solid ${({ theme }) => theme.brand.primaryDark};
  color: ${({ theme }) => theme.platform.black};
  padding: 0;
  width: 44px;
  height: 44px;
  :hover,
  :active,
  :focus {
    color: ${({ theme }) => theme.platform.black};
  }
`;
