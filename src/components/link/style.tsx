import styled from "styled-components";

import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: ${({ theme }) => theme.brand.primaryDark};
  transition: color 0.3s;

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    background-color: ${({ theme }) => theme.brand.primaryDark};
    transition: width 0.3s;
  }

  &:hover::before {
    width: 100%;
    right: 0;
  }
`;
