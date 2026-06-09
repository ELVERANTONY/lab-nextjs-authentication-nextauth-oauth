import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { findUserByEmail, createUser } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son obligatorios" },
        { status: 400 }
      );
    }

    const existingUser = findUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = createUser({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Usuario creado exitosamente", user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en el registro:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
