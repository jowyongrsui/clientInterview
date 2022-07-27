import styled from "@emotion/styled";
import { FC, useEffect } from "react";
import { mapDispatch, mapProps } from "../engine/redux";
import { $getTaskGroups, $getTasks } from "../engine/slices/tasking.slice";
import AppTasksTile from "./app.tasks.tile";
import AppTasksGroup from "./app.tasks.group";
import CoreButton from "./controls/button";
import { useNavigate } from "react-router-dom";

const AppTasks: FC = () => {
  const tasks = mapProps((state) => state.tasking.filteredTasks);
  const groups = mapProps((state) => state.tasking.taskGroups);
  const dispatch = mapDispatch();

  useEffect((): void => {
    dispatch($getTaskGroups());
    dispatch($getTasks());
  }, [dispatch]);

  const navigate = useNavigate();
  const newTaskBtn = (
    <CoreButton text="New Task" click={() => navigate("../task")} />
  );

  const tasktiles = tasks.map((task) => (
    <AppTasksTile key={task.id} task={task} />
  ));
  const taskgroups = groups.map((group) => (
    <AppTasksGroup key={group.id} taskGroup={group} />
  ));
  return (
    <Styled>
      <div className="groups">
        <div>{taskgroups}</div>
        {newTaskBtn}
      </div>
      {tasks && tasks.length ? (
        <div className="tasks">{tasktiles}</div>
      ) : (
        <h3>No Tasks</h3>
      )}
    </Styled>
  );
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
    justify-content: space-between;

    & > div {
      display: flex;
      column-gap: 4px;
    }
  }
  & > .tasks {
    grid-area: tasks;
    & > div {
      margin: 10px 0;
    }
  }
`;
export default AppTasks;
