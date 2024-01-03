
'use server'

import { hashSync }  from 'bcrypt';

import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUser(email: string): Promise<User | null> {
  try {        
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email
      }
    })
    
      return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function createUser(user: User): Promise<User | null> {
  try {

    const userFromDb =  await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashSync(user.password, 16)
      }        
    })
        
    return userFromDb;

  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function addAdminUser(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await createUser({
      id: '',
      name: process.env.ADMIN_NAME ? process.env.ADMIN_NAME : 'admin',
      email: process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL : 'admin@system.com',
      password: process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD : 'top-secret'
    })
  } catch (error) {

    throw error;
  }
}