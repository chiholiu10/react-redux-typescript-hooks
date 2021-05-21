import styled, { keyframes } from 'styled-components';

export const LoadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loaded = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 34px;
  height: 34px;
  border-radius: 50%;
`;