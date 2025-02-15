import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { body } from 'express-validator';
const JWT_SECRECT = process.env.JWT_SECRET || "murali"
const prisma = new PrismaClient();
export const createUser = async (req: Request, res: Response,) => {
    const { username, email, role } = req.body;
    if (!username || !email || !role) {
        res.status(400).json({ message: "Please fill in all fields" })
        return

    }
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            res.status(400).json({ message: "Email already exists" })
            return
        }
        const password = username + "@123";
        const hashpassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create(
            {
                data: {
                    username,
                    email,
                    password: hashpassword,
                    role: role,
                    isActive: true
                }
            }
        )

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRECT, { expiresIn: "1h" });
        res.status(201).json({ message: "User created successfully", user, token })
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
        return
    }
}

export const listUsers = async (req: Request, res: Response) => {

    try {
        const users = await prisma.user.findMany({
            where: {
                role: {
                    in: ['MANAGER', 'SALES', 'SUPPLIER', 'CASHIER'],
                },
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true

            }

        })
        if (!users) {
            res.status(404).json({ message: "No users found" })

        }
        res.status(200).json({
            message: "Users listed successfully",
            users
        })
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { username, email, password, role } = req.body
    try {
        const existingUser = await prisma.user.findFirst({
            where: { email }
        })
        if (!existingUser || existingUser.id !== id) {
            res.status(400).json({ message: "User doesnot exist" })
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.update({
            where: { id: id },
            data: {
                username: username,
                email: email,
                password: hashpassword,
                role: role
            }
        })
        res.status(200).json({ message: "User updated successfully", user })
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const existinguser = await prisma.user.findFirst({ where: { id } })
        if (!existinguser) {
            res.status(400).json({ message: "User doesnot exist" })
        }
        const user = await prisma.user.delete({ where: { id } })
        res.status(200).json({ message: "User deleted successfully", user })
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
    }

}

export const updateRole = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { role } = req.body
    try {
        const existinguser = await prisma.user.findFirst({ where: { id } })
        if (!existinguser) {
            res.status(400).json({ message: "User doesnot exist" })
        }
        const user = await prisma.user.update({ where: { id }, data: { role } })
        res.status(200).json({ message: "Role updated successfully", user })
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}