import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteTask,
  getTaskGroups,
  getTasks,
  saveTask,
  TaskDetailsModel,
  TaskGroupModel,
} from "../proxies/task.proxy";
import { RootState } from "../redux";

export const $getTasks = createAsyncThunk("thunk-get-tasks", getTasks);
export const $getTaskGroups = createAsyncThunk(
  "thunk-get-task-groups",
  getTaskGroups
);
export const $saveNewTask = createAsyncThunk("thunk-save-new-task", saveTask);
export const $deleteTask = createAsyncThunk("thunk-delete-task", deleteTask);

const __filterTasks = (
  filterGroups: number[],
  activeTasks: TaskDetailsModel[],
  filteredTasks: TaskDetailsModel[]
) => {
  filterGroups.forEach((groupNum) => {
    for (let i = 0; i < activeTasks.length; i++) {
      const { groupId } = activeTasks[i];
      if (groupId === groupNum) {
        filteredTasks.push(activeTasks[i]);
      }
    }
  });
};

export const taskingSlice = createSlice({
  name: "tasking",
  initialState: {
    isLoading: false,
    activeTasks: new Array<TaskDetailsModel>(),
    taskGroups: new Array<TaskGroupModel>(),
    filteredTasks: new Array<TaskDetailsModel>(),
    filterGroups: new Array<number>(),
  },
  reducers: {
    addFilter: (state, action: PayloadAction<number>) => {
      // reset tasks
      state.filteredTasks = [];
      // add groupId to filtered groups
      state.filterGroups.push(action.payload);
      __filterTasks(state.filterGroups, state.activeTasks, state.filteredTasks);
    },

    removeFilter: (state, action) => {
      // reset tasks
      state.filteredTasks = [];
      // remove groupId from filtered groups
      state.filterGroups = state.filterGroups.filter(
        (group) => group !== action.payload
      );

      if (state.filterGroups.length === 0) {
        // reset tasks to all active
        state.filteredTasks = state.activeTasks;
      } else {
        __filterTasks(
          state.filterGroups,
          state.activeTasks,
          state.filteredTasks
        );
      }
    },
  },
  extraReducers(builder) {
    builder.addCase($getTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase($getTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.activeTasks = action.payload;
      // set filteredTasks defaulted to allTasks
      state.filteredTasks = action.payload;
    });
    builder.addCase($getTaskGroups.fulfilled, (state, action) => {
      state.taskGroups = action.payload;
    });
    builder.addCase($saveNewTask.fulfilled, (state, action) => {
      // no need to update redux store, is this expected?
      console.log("Saved task:", action.payload);
    });
    builder.addCase($deleteTask.fulfilled, (state, action) => {
      console.log("Deleted task id:", action.meta.arg);
      state.activeTasks = state.activeTasks.filter(
        ({ id }) => id !== action.meta.arg
      );
      state.filteredTasks = state.activeTasks.filter(
        ({ id }) => id !== action.meta.arg
      );
    });
  },
});

export const { addFilter, removeFilter } = taskingSlice.actions;

export default taskingSlice.reducer;
