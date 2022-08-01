import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../../interfaces/todo';

export interface AppInfo {
    todos: Todo[] | null;
}

const initialState: AppInfo = {
    todos: null,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state = {
                ...state,
                todos: action.payload,
            };

            return state;
        },
        createNewTodoRdx: (state, action) => {
            let newTodos: Todo[] = [];

            if (state.todos) {
                newTodos = [...state.todos];
            }

            state = {
                ...state,
                todos: [...newTodos, action.payload],
            };

            return state;
        },
    },
});

export const { setTodos, createNewTodoRdx } = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
