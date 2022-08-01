import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../interfaces/todo';
import { deleteTodo, updateTodo } from '../requests/todoRequests';

const Todo: React.FC<{ data: Todo }> = ({ data }) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [editing, setEditing] = useState(false);

    const cancelEditing = () => {
        setEditing(false);
        setTitle(data.title);
        setDescription(data.description);
    };

    const deleteThis = async () => {
        await deleteTodo({ dispatch, id: data.id });
    };

    const save = async () => {
        await updateTodo({ title, description, id: data.id, dispatch });

        setEditing(false);
    };

    return (
        <div className="bg-gray-800 flex flex-col items-start justify-start w-full p-4 rounded-md mb-2">
            {editing ? (
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-gray-800 px-2 text-white border-2 border-gray-700"
                    placeholder="Title"
                />
            ) : (
                <strong className="text-white text-lg">{title}</strong>
            )}

            {editing ? (
                <textarea
                    rows={3}
                    className="w-full bg-gray-800 mt-1 px-2 text-white border-2 border-gray-700"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                ></textarea>
            ) : (
                <p className="text-gray-200">{description}</p>
            )}

            <div className="flex mt-2">
                <button
                    className="text-white bg-blue-500 w-16 h-8"
                    onClick={() => setEditing(true)}
                    disabled={editing}
                >
                    Edit
                </button>

                <button
                    className="text-white bg-red-800 w-16 h-8 mx-1"
                    onClick={cancelEditing}
                    disabled={!editing}
                >
                    Cancel
                </button>

                <button
                    className="text-white bg-green-500 w-16 h-8 mr-1"
                    onClick={save}
                >
                    Save
                </button>

                <button
                    className="text-white bg-red-500 w-16 h-8"
                    onClick={deleteThis}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Todo;
