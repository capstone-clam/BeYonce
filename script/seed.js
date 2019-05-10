'use strict'
const {db, User, Inventory, Category} = require('../server/db/models')

const seedCategories = [
  {
    name: 'Hat',
    image: '/headpiece-icon-thicker.png',
    inventories: [
      {
        item: 'flowerHat',
        filePath: '/beyflower.png',
        url: 'www.google.com'
      },
      {
        item: 'flowerHat1',
        filePath: '/beyflower.png',
        url: 'www.google.com'
      },
      {
        item: 'Hat 3',
        filePath: '/hat.png',
        url: 'www.google.com'
      }
    ]
  },
  {
    name: 'Dress',
    image: '/headpiece-icon-thinner.png',
    inventories: [
      {
        item: 'Dress 1',
        filePath: '/DarkenedFormation.png',
        url: 'www.google.com'
      },
      {
        item: 'Dress 2',
        filePath: '/DarkenedFormation2.png',
        url: 'www.google.com'
      },
      {
        item: 'Dress 3',
        filePath: '/DarkenedFormation3.png',
        url: 'www.google.com'
      }
    ]
  },
  {
    name: 'BodySuit',
    image:
      'https://cdn.fashionmagazine.com/wp-content/uploads/2013/08/Beyonce-Mrs-Carter-World-Tour-Ralph-Russo-Bodysuit-480x0-c-default.jpg',
    inventories: [
      {
        item: 'BodySuit 1',
        filePath: '/DarkenedFormation.png',
        url: 'www.google.com'
      },
      {
        item: 'BodySuit 2',
        filePath: '/DarkenedFormation2.png',
        url: 'www.google.com'
      },
      {
        item: 'BodySuit 3',
        filePath: '/DarkenedFormation3.png',
        url: 'www.google.com'
      }
    ]
  },
  {
    name: 'Songs',
    image: 'https://media.timeout.com/images/105252649/630/472/image.jpg',
    inventories: [
      {
        item: 'Single Ladies',
        filePath: '/SingleLadies.mp3',
        url: 'https://www.youtube.com/watch?v=4m1EFMoRFvY'
      },
      {
        item: 'Formation',
        filePath: '/Formation.mp3',
        url: 'https://www.youtube.com/watch?v=WDZJPJV__bQ'
      },
      {
        item: 'Run the World',
        filePath: '/RunTheWorld.mp3',
        url: 'https://www.youtube.com/watch?v=VBmMU_iwe6U'
      },
      {
        item: 'XO',
        filePath: '/XO.mp3',
        url:
          'https://www.youtube.com/watch?v=3xUfCUFPL-8&list=PLsTSfecal8Rze2uRHzw0XFgFLQUUicxaD&index=18'
      },
      {
        item: 'Love On Top',
        filePath: '/LoveOnTop.mp3',
        url: 'https://www.youtube.com/watch?v=Ob7vObnFUJc'
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
