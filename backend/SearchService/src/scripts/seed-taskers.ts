import prisma from '../lib/prisma';

async function main() {
  await prisma.taskerSearch.createMany({
    data: [
      {
        id: '1',
        userId: 'tasker-1',
        fullName: 'Ali Ahmadi',
        skills: 'plumbing,electrician',
        rating: 4.9,
        city: 'Tehran',
        isOnline: true,
      },

      {
        id: '2',
        userId: 'tasker-2',
        fullName: 'Reza Karimi',
        skills: 'cleaning',
        rating: 4.5,
        city: 'Tehran',
        isOnline: true,
      },

      {
        id: '3',
        userId: 'tasker-3',
        fullName: 'Mohammad Salehi',
        skills: 'moving',
        rating: 4.8,
        city: 'Tehran',
        isOnline: true,
      },
    ],

    skipDuplicates: true,
  });

  console.log('DONE');
}

main();