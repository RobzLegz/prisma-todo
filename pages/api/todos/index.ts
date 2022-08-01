import { NextApiRequest, NextApiResponse } from 'next';
import todoCtrl from '../../../src/controllers/todoController';

const { create, get } = todoCtrl;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            await create(req, res);
            break;
        case 'GET':
            await get(req, res);
            break;
    }
};
