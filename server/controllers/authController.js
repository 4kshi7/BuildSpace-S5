import jwt from "jsonwebtoken";
import zod from "zod";
import bcrypt from "bcrypt";
// import cookieParser from "cookieParser";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const DEFAULT_IMG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

const signupBody = zod.object({
  username: zod.string().min(4).max(20),
  password: zod.string().min(8),
  name: zod.string().max(25),
});

const signinBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const updateSchema = zod.object({
  name: zod.string().max(25).optional(),
  username: zod.string().min(4).max(20).optional(),
  img: zod.string().url().optional(),
});

const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", 
  sameSite: 'strict', // Helps prevent CSRF attacks
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
};

export const signup = async (req, res) => {
  const { success, data } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      error: "Username already registered/Incorrect inputs",
    });
  }

  const { username, password, name, img } = data;

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
        img: DEFAULT_IMG_URL || img,
      },
    });

    const userId = user.id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    res.cookie('token', token, cookieConfig);

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const signin = async (req, res) => {
  const { success, data } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid inputs",
    });
  }

  const { username, password } = data;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.cookie('token', token, cookieConfig);

    res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: "Logged out successfully" });
};

export const bulk = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        img: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const update = async (req, res) => {
  const userId = req.userId;

  const { success, data } = updateSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      error: "Invalid input",
    });
  }

  const { name, username, img } = data;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || undefined,
        username: username || undefined,
        img: img || undefined,
      },
    });

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        img: updatedUser.img,
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        error: "Username already taken",
      });
    }

    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
