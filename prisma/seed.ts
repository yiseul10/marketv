// test를 위한 대량의 데이터 seeding
// [...Array]는 array를 쉽고 빠르게 만드는 shortcut

import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function main() {
  [...Array.from(Array(500).keys())].forEach(async item => {
    const products = await client.product.create({
      data: {
        name: String(item),
        desc: String(item),
        image: String(item),
        price: item,
        user: {
          connect: {
            id: 5
          }
        }
      }
    });
    console.log(`${item}/500`);
  });
}

main()
  .catch(e => console.log(e))
  .finally(() => client.$disconnect());
