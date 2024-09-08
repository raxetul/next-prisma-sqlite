'use server';

import { z } from 'zod';
import {signIn} from '@/auth';
import { AuthError } from 'next-auth';
import { PrismaClient } from "@prisma/client";

import { getUser } from "@/db/user";


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter a name',
  }),
  email: z.string({
    invalid_type_error: 'Please enter a name',
  }),
  password: z.string({
    invalid_type_error: 'Please enter a name',
  })
});
const UpdateUser = FormSchema;


export type State = {
  errors?: {
    id?: string[];
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function updateUser(
  prevState: State,
  formData: FormData,
) {

  try {
      
      const { id, name, email, password } = UpdateUser.parse({
        id: formData.get('id'),
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      });
    

    return { id, name, email, password };

  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }

  // } catch (error) {
  //   return {
  //     message: 'Database Error: Failed to Update Invoice.',
  //   };
  // }
  // revalidatePath('/dashboard/invoices');
  // redirect('/dashboard/invoices');
}
