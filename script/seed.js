'use strict'
const {db, User, Inventory, Category} = require('../server/db/models')

const seedCategories = [
  {
    name: 'Hat',
    image: '/icons/headpiece_noOutline.png',
    inventories: [
      {
        item: 'flowerHat',
        filePath: '/img/hats/FlowerhatBrightened75.png'
      },
      {
        item: 'finalcrown',
        filePath: '/img/hats/finalcrown.png'
      },
      {
        item: 'beadedCrown',
        filePath: '/img/hats/beadedCrown.png'
      },
      {
        item: 'orangeHat',
        filePath: '/img/hats/OrangeHatCrop.png'
      }
    ]
  },

  {
    name: 'BodySuit',
    image: '/icons/bodysuitIcon.png',
    inventories: [
      {
        item: 'barbieBodysuit',
        filePath: '/img/bodysuit/BeyBarbieBodysuit.png'
      },
      {
        item: 'redBodysuit',
        filePath: '/img/bodysuit/RedBeaded_bodysuit.png'
      },
      {
        item: 'goldBodysuit',
        filePath: '/img/bodysuit/Gold_bodysuit.png'
      },
      {
        item: 'pearlBodysuit',
        filePath: '/img/bodysuit/Pearl_bodysuit.png'
      }
    ]
  },
  {
    name: 'Songs',
    image: '/icons/musicIcon.png',
    inventories: [
      {
        item: 'Single Ladies',
        filePath: '/music/SingleLadies.mp3',
        imageFilePath: '/icons/SingleLadies-icon.png'
      },
      {
        item: 'Formation',
        filePath: '/music/Formation.mp3',
        imageFilePath: '/icons/Formation-icon.png'
      },
      {
        item: 'Run the World',
        filePath: '/music/RunTheWorld.mp3',
        imageFilePath: '/icons/RunTheWorld-icon.png'
      },
      {
        item: 'XO',
        filePath: '/music/XO.mp3',
        imageFilePath: '/icons/Xo-icon.png'
      },
      {
        item: 'Love On Top',
        filePath: '/music/LoveOnTop.mp3',
        imageFilePath: '/icons/LoveOnTop-icon.png'
      }
    ]
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // Seed Data Base
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const categories = await Promise.all(
    seedCategories.map(category => {
      return Category.create(category, {
        include: [Inventory]
      })
    })
  )

  console.log(`seeded ${categories.length} categories`)

  console.log(`seeded ${users.length} users`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
