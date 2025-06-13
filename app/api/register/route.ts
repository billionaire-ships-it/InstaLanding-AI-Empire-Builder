// app/api/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '@/models/User';
import connectDB from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}

