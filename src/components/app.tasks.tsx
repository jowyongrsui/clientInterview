import styled from "@emotion/styled";
import { FC, useEffect } from "react";
import { mapDispatch, mapProps } from "../engine/redux";
import { $getTaskGroups, $getTasks } from "../engine/slices/tasking.slice";
import AppTasksTile from "./app.tasks.tile";
import AppTasksGroup from "./app.tasks.group";

const AppTasks: FC = () => {
  const tasks = mapProps((state) => state.tasking.activeTasks);
  const groups = mapProps((state) => state.tasking.taskGroups);
  const dispatch = mapDispatch();

  useEffect((): void => {
    dispatch($getTaskGroups());
    dispatch($getTasks());
  }, [dispatch]);

  if (tasks && tasks.length) {
    const tasktiles = tasks.map((task) => <AppTasksTile key={task.id} task={task} />);
    const taskgroups = groups.map((group) => <AppTasksGroup key={group.id} taskGroup={group} />);
    return (
      <Styled>
        <div className="groups">{taskgroups}</div>
        <div className="tasks">{tasktiles}</div>
      </Styled>
    );
  }
  return <h3>No Tasks</h3>;
};

const Styled = styled.div`
  height: 100%;
  display: grid;
  grid-template:
    "groups" auto
    "tasks" 1fr
    / 1fr;
  & > .groups {
    grid-area: groups;
    display: flex;
    flex-direction: row;
    column-gap: 4px;
  }
  & > .tasks {
    grid-area: tasks;
    & > div {
      margin: 10px 0;
    }
  }
`;
export default AppTasks;
