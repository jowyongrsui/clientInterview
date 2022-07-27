import styled from "@emotion/styled";
import { FC } from "react";

const Spinner: FC = () => {
  return (
    <Styled>
      <div className="spinner"></div>
    </Styled>
  );
};

const Styled = styled.div`
  display: flex;
  justify-content: center;

  .spinner {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Spinner;
