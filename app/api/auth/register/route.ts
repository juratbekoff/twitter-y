import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const step = searchParams.get("step");

    let { name, username, email, password } = await req.json();

    if (step === "1") {
      let isExistingUser = await User.findOne({
        email,
      });

      if (isExistingUser) {
        return NextResponse.json(
          { error: "Email is already existed!" },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: true });
    } else if (step === "2") {
      const isExistinUsername = await User.findOne({ username });

      if (isExistinUsername) {
        return NextResponse.json(
          { error: "Username already exists" },
          { status: 400 }
        );
      }

      const hashedPassword = await hash(password, 10);

      const user = await User.create({
        email,
        username,
        name,
        password: hashedPassword,
      });

      return NextResponse.json({ success: true, user });
    }
  } catch (error) {
    let result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
