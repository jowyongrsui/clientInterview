import styled from "@emotion/styled";
import { FC } from "react";
import { mapProps } from "../engine/redux";
import logo from "../index.svg";

const AppNav: FC = () => {
  const username = mapProps((state) => state.user.displayName);
  return (
    <Styled>
      <h1>TASKS</h1>
      <div>
        <img src={logo} className="logo" alt="logo" />
        <div>{username}</div>
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  & h1 {
    opacity: 0.85;
  }
  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.2em;
    text-transform: uppercase;
    font-weight: 500;
    & img {
      height: 60px;
      pointer-events: none;
    }
    @media (prefers-reduced-motion: no-preference) {
      & img {
        animation: logo-spin infinite 20s linear;
      }
    }
    @keyframes logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;
export default AppNav;
