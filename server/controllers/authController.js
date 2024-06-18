import jwt from "jsonwebtoken";
import zod from "zod";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const signupBody = zod.object({
  username: zod.string(),
  password: zod.string(),
  name: zod.string(),
});

const signinBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

export const signup = async (req, res) => {
    const { success, data } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        error: "Username already registered/Incorrect inputs",
      });
    }
  
    const { username, password, name } = data;
  
    try {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });
  
      if (existingUser) {
        return res.status(400).json({
          error: "Username already registered",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          name,
        },
      });
  
      const userId = user.id;
      const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  
      res.status(201).json({
        message: "User created successfully",
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  };

export const signin = async () => {};
export const bulk = async () => {};
export const update = async () => {};
