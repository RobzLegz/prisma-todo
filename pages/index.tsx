import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Todo from '../src/components/Todo';
import { AppInfo, selectApp } from '../src/redux/slices/appSlice';
import { createNewTodo, getTodos } from '../src/requests/todoRequests';

const Home: NextPage = () => {
    const dispatch = useDispatch();

    const appInfo: AppInfo = useSelector(selectApp);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!appInfo.todos) {
            getTodos({ dispatch });
        }
    }, [appInfo.todos]);

    const createTask = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        await createNewTodo({ title, description, dispatch });

        setTitle('');
        setDescription('');
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-start bg-gray-900 py-10">
            <Head>
                <title>Prisma todo app</title>
                <meta
                    name="description"
                    content="Full stack prisma & next js app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col w-[95%] max-w-[600px] justify-start items-center">
                <h1 className="text-4xl text-white">Todos</h1>

                <form className="flex flex-col w-full mt-10">
                    <input
                        type="text"
                        placeholder="Task name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-gray-800 rounded-md px-2 text-white h-8 mb-2 border-2 border-gray-700"
                    />

                    <textarea
                        rows={7}
                        className="w-full bg-gray-800 rounded-md px-2 text-white border-2 border-gray-700"
                        placeholder="Task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>

                    <button
                        type="submit"
                        onClick={createTask}
                        className="w-48 bg-green-400 mt-2 h-8 rounded-md text-white"
                    >
                        Submit
                    </button>
                </form>

                <div className="flex flex-col justify-start items-center mt-4 w-full">
                    {appInfo.todos?.map((todo) => {
                        if (typeof todo === 'number' || !todo.id) {
                            return null;
                        }

                        return <Todo data={todo} key={todo.id} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
