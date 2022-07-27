import styled from "@emotion/styled";
import { FC, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TaskDetailsModel } from "../engine/proxies/task.proxy";
import { mapDispatch, mapProps } from "../engine/redux";
import { $saveNewTask } from "../engine/slices/tasking.slice";
import CoreButton from "./controls/button";

const TaskCreate: FC = () => {
  const dispatch = mapDispatch();
  const navigate = useNavigate();

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const groupRef = useRef<HTMLSelectElement>(null);

  const groups = mapProps((state) => state.tasking.taskGroups);
  const taskGroups = groups.map(({ id, name }) => (
    <option key={id} value={id}>
      {name}
    </option>
  ));

  const cancelBtn = <CoreButton text="Cancel" click={() => navigate("../")} />;
  const saveBtn = (
    <CoreButton
      text="Save"
      click={() => {
        // cast groupId to number for api
        const groupId = groupRef?.current?.value ? +groupRef.current.value : 0;
        const newTask = {
          id: 0,
          description: descriptionRef?.current?.value || "",
          groupId,
        } as TaskDetailsModel;
        dispatch($saveNewTask(newTask));
        navigate("../");
      }}
    />
  );

  return (
    <Styled>
      <h2>New Task</h2>
      <section>
        Description: <textarea ref={descriptionRef} />
      </section>
      <section>
        Group: <select ref={groupRef}>{taskGroups}</select>
      </section>
      <section>
        {saveBtn} {cancelBtn}
      </section>
    </Styled>
  );
};

const Styled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  section {
    margin-bottom: 20px;
  }
`;

export default TaskCreate;
