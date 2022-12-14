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
        deleteTodoRdx: (state, action) => {
            let newTodos: Todo[] = [];

            if (state.todos) {
                newTodos = state.todos.filter(
                    (todo) => todo.id !== action.payload
                );
            }

            state = {
                ...state,
                todos: [...newTodos, action.payload],
            };

            return state;
        },
        updateTodoRdx: (state, action) => {
            let newTodos: Todo[] = [];

            if (state.todos) {
                newTodos = state.todos.map((todo) => {
                    if (todo.id === action.payload.id) {
                        return action.payload;
                    }

                    return todo;
                });
            }

            state = {
                ...state,
                todos: newTodos,
            };

            return state;
        },
    },
});

export const { setTodos, createNewTodoRdx, deleteTodoRdx, updateTodoRdx } =
    appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
