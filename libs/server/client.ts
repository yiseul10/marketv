import { PrismaClient } from '@prisma/client';

declare global {
  var client: PrismaClient | undefined;
}
// hot reloading 마다 생기는 클라이언트 문제
const client = global.client || new PrismaClient();
if (process.env.NODE_ENV === 'development') global.client = client;

export default client;
