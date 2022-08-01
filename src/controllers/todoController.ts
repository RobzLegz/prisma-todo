import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../lib/prisma';

const todoCtrl = {
    create: async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const {
                title,
                description,
            }: { title?: string; description?: string } = req.body;

            if (!title) {
                return res.status(400).json({ err: 'Invalid title' });
            }

            if (typeof description !== 'string') {
                return res.status(400).json({ err: 'Invalid description' });
            }

            const newTodo = await prisma?.task.create({
                data: {
                    title,
                    description,
                },
            });

            res.json({ msg: 'Create Success', newTodo: newTodo });
        } catch (err: any) {
            return res.status(500).json({ err: err.message });
        }
    },
    get: async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const todos = await prisma?.task.findMany();

            res.json(todos);
        } catch (err: any) {
            return res.status(500).json({ err: err.message });
        }
    },
    update: async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const todoId = req.query.id;
            const {
                title,
                description,
            }: { title?: string; description?: string } = req.body;

            const updatedTodo = await prisma?.task.update({
                where: { id: Number(todoId) },
                data: { title, description },
            });

            res.json({ msg: 'Update success', updatedTodo });
        } catch (err: any) {
            return res.status(500).json({ err: err.message });
        }
    },
    deleteOne: async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const todoId = req.query.id;

            await prisma?.task.delete({
                where: { id: Number(todoId) },
            });

            res.json({ msg: 'Delete success' });
        } catch (err: any) {
            return res.status(500).json({ err: err.message });
        }
    },
};

export default todoCtrl;
