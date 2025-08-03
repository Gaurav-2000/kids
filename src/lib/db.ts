// PrismaClient initialized for Edge/Serverless with Accelerate extension
// If you run locally with a standard PostgreSQL connection, use '@prisma/client' instead of '@prisma/client/edge'
// and remove the withAccelerate extension if not using Accelerate.
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';


export const db = new PrismaClient().$extends(withAccelerate());
