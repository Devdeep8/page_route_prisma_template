import bcrypt from "bcrypt";
import prisma from "@/config/prismaClient";
import createJwtToken from "@/utils/jwtUtils";

export default async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Check if the user exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare the hashed password with the provided password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT token for the authenticated user
    const token = createJwtToken(existingUser);

  

    // Log the login action in the AuditLog table
    await prisma.auditLog.create({
      data: {
        action: `User logged in with email: ${existingUser.email}`,
        userId: existingUser.id,
      },
    });

    // Return success response
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      token,
      success: true,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
