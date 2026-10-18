// // prisma/seed.ts
// import { PrismaClient, VerificationStatus } from '@prisma/client';
// import { skillsData } from './seedData/skills';

// const prisma = new PrismaClient();

// const TASKER_COUNT = 500;
// const FIRST_NAMES_FA = ["احمد", "سارا", "رضا", "مریم", "علی", "زهرا", "محمد", "فاطمه", "حسین", "نرگس"];
// const LAST_NAMES_FA = ["محمدی", "حسینی", "کریمی", "رضایی", "موسوی", "علوی", "احمدی", "پور", "یزدانی", "نوری"];
// const FIRST_NAMES_EN = ["Ahmad", "Sara", "Reza", "Maryam", "Ali", "Zahra", "Mohammad", "Fatemeh", "Hossein", "Narges"];
// const LAST_NAMES_EN = ["Mohammadi", "Hosseini", "Karimi", "Rezaei", "Mousavi", "Alavi", "Ahmadi", "Pour", "Yazdani", "Nouri"];
// const CITIES = [
//   { name: "تهران", nameEn: "Tehran" },
//   { name: "مشهد", nameEn: "Mashhad" },
//   { name: "اصفهان", nameEn: "Isfahan" },
//   { name: "کرج", nameEn: "Karaj" },
//   { name: "شیراز", nameEn: "Shiraz" },
//   { name: "تبریز", nameEn: "Tabriz" },
//   { name: "قم", nameEn: "Qom" },
//   { name: "اهواز", nameEn: "Ahvaz" },
//   { name: "کرمانشاه", nameEn: "Kermanshah" },
//   { name: "رشت", nameEn: "Rasht" }
// ];

// function randomInt(min: number, max: number) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function randomItem<T>(arr: T[]): T {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// function randomRating() {
//   return parseFloat((Math.random() * 2 + 3).toFixed(1)); // 3.0 to 5.0
// }

// function randomName(lang: 'fa' | 'en') {
//   const first = lang === 'fa' ? randomItem(FIRST_NAMES_FA) : randomItem(FIRST_NAMES_EN);
//   const last = lang === 'fa' ? randomItem(LAST_NAMES_FA) : randomItem(LAST_NAMES_EN);
//   return `${first} ${last}`;
// }

// function randomBio(lang: 'fa' | 'en', skills: string[]) {
//   const bioFa = `من یک ${randomItem(skills)} ماهر با ${randomInt(2, 10)} سال سابقه هستم. با دقت و کیفیت بالا کار می‌کنم.`;
//   const bioEn = `I am a skilled ${randomItem(skills)} with ${randomInt(2, 10)} years of experience. I work with high precision and quality.`;
//   return lang === 'fa' ? bioFa : bioEn;
// }

// async function main() {
//   console.log('🌱 Seeding User Service...');

//   // 1. Create skills (if not exist)
//   console.log('📌 Seeding skills...');
//   for (const skill of skillsData) {
//     await prisma.skill.upsert({
//       where: { name: skill.name },
//       update: {},
//       create: { name: skill.name, icon: null },
//     });
//   }
//   const allSkills = await prisma.skill.findMany();
//   console.log(`✅ ${allSkills.length} skills ready.`);

//   // 2. Create 500 taskers
//   console.log(`👥 Creating ${TASKER_COUNT} taskers...`);
//   const batchSize = 50;
//   for (let i = 0; i < TASKER_COUNT; i++) {
//     const name = randomName('fa');    // you can alternate language
//     const nameEn = randomName('en');
//     const city = randomItem(CITIES);
//     const skillNames = allSkills.map(s => s.name);
//     const randomSkills = allSkills
//       .sort(() => 0.5 - Math.random())
//       .slice(0, randomInt(2, 6))
//       .map(s => s.name);
//     const bio = randomBio('fa', randomSkills);
//     const bioEn = randomBio('en', randomSkills);
//     const rating = randomRating();
//     const hourlyRate = randomInt(150000, 800000);
//     const isActive = Math.random() > 0.2; // 80% active

//     // Generate a consistent UUID for both Auth and User (but we only create UserProfile)
//     // In real world, these userIds must exist in Auth service. We'll generate random UUIDs.
//     const userId = crypto.randomUUID();

//     const profile = await prisma.userProfile.create({
//       data: {
//         userId,
//         name: name,
//         avatarUrl: null,
//         bio: bio,
//         address: `${city.name}, برخی خیابان اصلی`,
//         rating,
//         ratingCount: randomInt(1, 200),
//         locationLat: 35.6892 + (Math.random() - 0.5) * 0.5,
//         locationLng: 51.3890 + (Math.random() - 0.5) * 0.5,
//         taskerProfile: {
//           create: {
//             isActive,
//             hourlyRate,
//             serviceAreas: [city.name, `${city.name} شمال`, `${city.name} غرب`],
//           },
//         },
//         verifications: {
//           create: [
//             {
//               type: "ID_CARD",
//               status: Math.random() > 0.3 ? VerificationStatus.APPROVED : VerificationStatus.PENDING,
//               documentUrl: "https://example.com/doc.jpg",
//             },
//             {
//               type: "CERTIFICATE",
//               status: Math.random() > 0.5 ? VerificationStatus.APPROVED : VerificationStatus.PENDING,
//             },
//           ],
//         },
//       },
//       include: { taskerProfile: true },
//     });

//     // Assign skills to this tasker (TaskerSkill)
//     for (const skillName of randomSkills) {
//       const skill = allSkills.find(s => s.name === skillName);
//       if (skill) {
//         await prisma.taskerSkill.create({
//           data: {
//             userProfileId: profile.id,
//             skillId: skill.id,
//             level: randomInt(1, 5),
//           },
//         });
//       }
//     }

//     if ((i + 1) % batchSize === 0) console.log(`   ${i + 1} taskers created...`);
//   }

//   console.log(`🎉 Successfully seeded ${TASKER_COUNT} taskers with skills.`);
// }

// main()
//   .catch(e => {
//     console.error('❌ Seeding failed:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


//for seedData/skills.ts




// prisma/seed.ts
import { PrismaClient, VerificationStatus } from '@prisma/client';
import { skillsData, SkillData } from './seedData/skills';

const prisma = new PrismaClient();

const TASKER_COUNT = 500;
const FIRST_NAMES = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth"];
const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
const CITIES = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "Austin"
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomRating() {
  return parseFloat((Math.random() * 2 + 3).toFixed(1));
}

function randomName() {
  return `${randomItem(FIRST_NAMES)} ${randomItem(LAST_NAMES)}`;
}

function randomBio(skills: string[]) {
  const skillSample = skills.slice(0, 2).join(', ');
  return `I specialize in ${skillSample}. With ${randomInt(2, 12)} years of experience, I provide high-quality service. I am reliable, punctual, and customer-focused.`;
}

async function main() {
  console.log('🌱 Seeding User Service (English only) ...');

  // 1. Create skills (only if not exist)
  console.log('📌 Seeding skills...');
  for (const skill of skillsData) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: { name: skill.name, icon: null },
    });
  }
  const allSkills = await prisma.skill.findMany();
  console.log(`✅ ${allSkills.length} skills seeded.`);

  // 2. Create 500 taskers
  console.log(`👥 Creating ${TASKER_COUNT} taskers...`);
  const batchSize = 50;
  for (let i = 0; i < TASKER_COUNT; i++) {
    const name = randomName();
    const city = randomItem(CITIES);
    // Select random skills (between 3 and 7)
    const shuffled = [...allSkills];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selectedSkills = shuffled.slice(0, randomInt(3, 7));
    const skillNames = selectedSkills.map(s => s.name);
    const bio = randomBio(skillNames);
    const rating = randomRating();
    const hourlyRate = randomInt(15000, 150000); // in cents – but we store as integer (e.g., 25000 = $250)
    const isActive = Math.random() > 0.2;

    const userId = crypto.randomUUID();

    const profile = await prisma.userProfile.create({
      data: {
        userId,
        name,
        avatarUrl: null,
        bio,
        address: `${city}, Main Street area`,
        rating,
        ratingCount: randomInt(1, 500),
        locationLat: 40.7128 + (Math.random() - 0.5) * 0.5,
        locationLng: -74.0060 + (Math.random() - 0.5) * 0.5,
        taskerProfile: {
          create: {
            isActive,
            hourlyRate,
            serviceAreas: [city, `${city} Downtown`, `${city} Suburbs`],
          },
        },
        verifications: {
          create: [
            {
              type: "ID_CARD",
              status: Math.random() > 0.3 ? VerificationStatus.APPROVED : VerificationStatus.PENDING,
              documentUrl: "https://example.com/id.jpg",
            },
            {
              type: "BACKGROUND_CHECK",
              status: Math.random() > 0.5 ? VerificationStatus.APPROVED : VerificationStatus.PENDING,
            },
          ],
        },
      },
    });

    // Assign skills
    for (const skill of selectedSkills) {
      await prisma.taskerSkill.create({
        data: {
          userProfileId: profile.id,
          skillId: skill.id,
          level: randomInt(1, 5),
        },
      });
    }

    if ((i + 1) % batchSize === 0) console.log(`   ${i + 1} taskers created...`);
  }

  console.log(`🎉 Successfully seeded ${TASKER_COUNT} taskers with ${allSkills.length} skills.`);
}

main()
  .catch(e => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());