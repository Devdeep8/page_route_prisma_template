import bcrypt from "bcrypt";
import prisma from "@/config/prismaClient";
import createJwtToken from "@/utils/jwtUtils";
import { cookies } from "next/headers";
export default async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, fullName, phoneNumber } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user and their profile
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          create: {
            fullName,
            phoneNumber,
          },
        },
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    // Generate JWT token
    const token = createJwtToken(user);
    // Set token in cookie
    // Log the action in the AuditLog table
    await prisma.auditLog.create({
      data: {
        action: `User registered with email: ${user.email}`,
        userId: user.id, // Assuming the action is performed by the same user
      },
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user, token , success: true});
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
