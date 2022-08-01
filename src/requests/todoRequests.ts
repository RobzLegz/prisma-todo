import axios from 'axios';
import { Dispatch } from 'redux';
import { createNewTodoRdx, setTodos } from '../redux/slices/appSlice';
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

    console.log(data)

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
