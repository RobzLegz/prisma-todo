import axios from 'axios';
import { Dispatch } from 'redux';
import {
    createNewTodoRdx,
    deleteTodoRdx,
    setTodos,
    updateTodoRdx,
} from '../redux/slices/appSlice';
import { setNotification } from '../redux/slices/notificationSlice';
import { TODO_BASE } from './routes';

export const createNewTodo = async ({
    title,
    description,
    dispatch,
}: {
    title: string;
    description: string;
    dispatch: Dispatch;
}) => {
    if (!title) {
        return;
    }

    const data = {
        title,
        description,
    };

    console.log(data);

    await axios
        .post(TODO_BASE, data)
        .then((res) => {
            dispatch(createNewTodoRdx(res.data.newTodo));
        })
        .catch((err) => {
            if (!err.response) {
                return console.log(err);
            }

            const message: string = err.response.data.err;
            dispatch(
                setNotification({
                    type: 'error',
                    message: message,
                })
            );
        });
};

export const getTodos = async ({ dispatch }: { dispatch: Dispatch }) => {
    await axios
        .get(TODO_BASE)
        .then((res) => {
            dispatch(setTodos(res.data));
        })
        .catch((err) => {
            if (!err.response) {
                return console.log(err);
            }

            const message: string = err.response.data.err;
            dispatch(
                setNotification({
                    type: 'error',
                    message: message,
                })
            );
        });
};

export const updateTodo = async ({
    dispatch,
    id,
    title,
    description,
}: {
    title: string;
    description: string;
    dispatch: Dispatch;
    id: number;
}) => {
    const data = {
        title,
        description,
    };

    await axios
        .put(`${TODO_BASE}/${id}`, data)
        .then((res) => {
            console.log(res.data.updatedTodo)
            dispatch(updateTodoRdx(res.data.updatedTodo));
        })
        .catch((err) => {
            if (!err.response) {
                return console.log(err);
            }

            const message: string = err.response.data.err;
            dispatch(
                setNotification({
                    type: 'error',
                    message: message,
                })
            );
        });
};

export const deleteTodo = async ({
    dispatch,
    id,
}: {
    dispatch: Dispatch;
    id: number;
}) => {
    await axios
        .delete(`${TODO_BASE}/${id}`)
        .then((res) => {
            dispatch(deleteTodoRdx(id));
        })
        .catch((err) => {
            if (!err.response) {
                return console.log(err);
            }

            const message: string = err.response.data.err;
            dispatch(
                setNotification({
                    type: 'error',
                    message: message,
                })
            );
        });
};
