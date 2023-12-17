import styled, { css } from "styled-components";
import { Input as AndtInput, Form, InputNumber } from "antd";

export const InputBaseStyles = css`
  padding: 0px 20px;
  font-family: "Lexend";
  width: 100%;
  height: 44px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  background: ${({ theme }) => theme.platform.white};
  box-sizing: border-box;
  border-radius: 4px;
  margin: 0;
  resize: none;
  border: 1px solid ${({ theme }) => theme.platform.grayscaleBorders};
  input {
    height: 100%;
    caret-color: ${({ theme }) => theme.brand.primaryMain} !important;
  }
  :active,
  :focus,
  :hover {
    resize: none;
    border-color: ${({ theme }) => theme.platform.black} !important;
    box-shadow: 0 1px 1px ${({ theme }) => theme.platform.lightGrayishBlue}75
        inset,
      0 0 8px ${({ theme }) => theme.platform.lightGrayishBlue}06;
    outline: 0 none;
  }
  &.ant-select-disabled {
    pointer-events: none;
    color: ${({ theme }) => theme.platform.grayscalePlaceholders};
  }
`;

export const FormGroup = styled(Form.Item)`
  width: 100%;
  text-align: left;
  font-family: "Lexend";
  &.ant-form-item-has-error {
    .ant-select {
      :active,
      :focus,
      :hover {
        border: 1px solid transparent !important;
      }
      :not(.ant-select-disabled):not(.ant-select-customize-input) {
        .ant-select-selector {
          background-color: ${({ theme }) => theme.platform.white};
          border: 1px solid ${({ theme }) => theme.platform.redMain} !important;
        }
      }
    }
  }
  &.ant-form-item-has-error {
    .ant-input-number-group-wrapper {
      background-color: ${({ theme }) => theme.platform.white};
      border: 1px solid ${({ theme }) => theme.platform.redMain} !important;
    }
  }
  &.ant-form-item-has-error {
    .ant-form-item-control-input-content {
      .ant-input {
        background-color: ${({ theme }) => theme.platform.white};
        border: 1px solid ${({ theme }) => theme.platform.redMain} !important;
      }
    }
  }

  margin: 0;
  > div {
    padding: 0 !important;
    > label {
      margin-bottom: 8px !important;
    }
  }
  label {
    padding: 0;
    color: ${({ theme }) => theme.platform.black};
    font-weight: 600;
    font-family: Lexend;
    font-size: 12px;
    line-height: 15px;
    margin-bottom: 8px !important;
    height: auto;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    ::before {
      font-family: Lexend !important;
      font-weight: 600 !important;
      line-height: 15px !important;
      font-size: 12px !important;
      color: ${({ theme }) => theme.platform.black} !important;
    }
  }
  .ant-form-item-explain {
    .ant-form-item-explain-error {
      font-size: 12px;
      font-weight: 600;
      line-height: 15px;
      color: ${({ theme }) => theme.platform.redMain};
    }
  }
  p {
    margin-top: -4px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.platform.grayscalePlaceholders};
  }
`;

export const FormControl = styled(AndtInput)`
  ${InputBaseStyles};
  border: 1px solid ${({ theme }) => theme.platform.grayscaleBorders};
  :disabled {
    border: 1px solid ${({ theme }) => theme.platform.grayscaleBorders};
  }
`;

export const FormControlCurrency = styled(InputNumber)`
  ${InputBaseStyles};

  position: relative;
  display: flex;
  align-items: stretch;
  padding-right: 12px;

  .ant-input-number-handler-wrap {
    display: none;
  }
  .ant-input-number-input-wrap {
    width: 100%;
    height: 100%;
    .ant-input-number-input {
      padding: 0;
    }
  }
  .ant-input-number-group {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 36px;
    align-items: stretch;

    .ant-input-number {
      &.ant-input-number-focused {
        box-shadow: none;
      }
      border: none;
      padding: 0;
      height: 100%;
      display: flex;
      align-items: center;
      &:hover,
      :active,
      :focus {
        box-shadow: none;
      }
    }

    .ant-input-number-group-addon {
      background: transparent;
      border: none;
      padding: 0;
      width: 100%;
    }
  }
`;
