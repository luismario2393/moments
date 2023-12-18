import styled from "styled-components";

export const ContainerVideo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-direction: column;
  height: 100vh;
`;

export const Video = styled.video`
  width: 330px;
  height: 200px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.brand.primaryDark};
  object-fit: cover;
`;

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  /* position: absolute;
  bottom: 50px;
  left: 150px; */
`;
