import { NextApiRequest, NextApiResponse } from 'next';
import todoCtrl from '../../../src/controllers/todoController';

const { deleteOne, update } = todoCtrl;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'DELETE':
            await deleteOne(req, res);
            break;
        case 'PUT':
            await update(req, res);
            break;
    }
};
