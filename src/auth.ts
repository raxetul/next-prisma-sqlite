import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { z } from 'zod';

import { authConfig } from '@/auth.config';
import { getUser } from "@/lib/user";
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google"


const prisma = new PrismaClient();

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            if (user.hashedPassword) {
              const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);
              if (passwordsMatch) return user;
            } else {
              console.error('Password login failed');
              return null;
            }

          }
          console.error('Invalid credentials');
          return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
      
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {    
    async session({ session, user }) {
        session.user.id = user.id
        return session
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});