import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const products = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json({ products })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    }


}

export const getItemById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const product = await prisma.product.findUnique({where:{id:id}});
        res.status(200).json({ product })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


