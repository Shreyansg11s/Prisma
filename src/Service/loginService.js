import { prisma } from "../prisma.js";
import  bcrypt from "bcrypt";

export const Login = async (data) => {
  const { username, password } = data;
  try {
    // 1. Find user with password selected
    const user = await prisma.user.findUnique({
      where: { username: username },
      select: { password: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    

    return passwordMatch;


  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
