import styled from "@emotion/styled";
import { FC } from "react";
import { mapDispatch, mapProps } from "../engine/redux";
import { $authenticateUser } from "../engine/slices/user.slice";
import AppNav from "./app.navbar";
import AppTasks from "./app.tasks";
import CoreButton from "./controls/button";

const AppHome: FC = () => {
  const dispatch = mapDispatch();
  const ready = mapProps((state) => state.user.isAuthenticated);

  const login = (
    <CoreButton text="Login" click={() => dispatch($authenticateUser())}/>
  );
  return (
    <Styled>
      <div className="navbar">
        <AppNav />
      </div>
      <div className="tasks">{ready ? <AppTasks /> : login}</div>
    </Styled>
  );
};

const Styled = styled.div`
  height: 100%;
  display: grid;
  grid-template:
    "navbar" 80px
    "tasks " 1fr
    / 1fr;
  & > .navbar {
    grid-area: navbar;
    width: 70%;
    justify-self: center;
  }
  & > .tasks {
    grid-area: tasks;
    width: 70%;
    justify-self: center;
  }
`;
export default AppHome;
