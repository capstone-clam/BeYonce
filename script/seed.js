'use strict'

const db = require('../server/db')
const {User, Inventory, Category} = require('../server/db/models')

const seedInventory = [
  {
    singleProduct: 'Hat 1',
    filePath: '/DarkenedFormation.png',
    url: 'www.google.cl',
    category: [
      {
        name: 'Hat'
      }
    ]
  },
  {
    singleProduct: 'Hat 2',
    filePath: '/DarkenedFormation.png',
    url: 'www.google.cl',
    category: [
      {
        name: 'Hat'
      }
    ]
  },
  {
    singleProduct: 'Hat 3',
    filePath: '/DarkenedFormation.png',
    url: 'www.google.cl',
    category: [
      {
        name: 'Hat'
      }
    ]
  },
  {
    singleProduct: 'bodysuit 1',
    filePath: '/DarkenedFormation.png',
    url: 'www.google.cl',
    category: [
      {
        name: 'Bodysuit'
      }
    ]
  },
  {
    singleProduct: 'bodysuit 2',
    filePath: '/DarkenedFormation.png',
    url: 'www.google.cl',
    category: [
      {
        name: 'Bodysuit'
      }
    ]
  },
  {
    singleProduct: 'bodysuit 3',
    filePath: '/DarkenedFormation.png',
    url: 'www.google.cl',
    category: [
      {
        name: 'Bodysuit'
      }
    ]
  },
  {
    singleProduct: 'Dress 1',
    filePath: '/DarkenedFormation.png',
    url: 'www.google.cl',
    category: [
      {
        name: 'Dress'
      }
    ]
  },
  {
    singleProduct: 'Dress 2',
    filePath: '/DarkenedFormation.png',
    url: 'www.google.cl',
    category: [
      {
        name: 'Dress'
      }
    ]
  },
  {
    singleProduct: 'Dress 3',
    filePath: '/DarkenedFormation.png',
    url: 'www.google.cl',
    category: [
      {
        name: 'Dress'
      }
    ]
  },
  {
    singleProduct: 'Song 1',
    filePath: '/DarkenedFormation.mp3',
    url: 'www.google.cl',
    category: [
      {
        name: 'Song'
      }
    ]
  },
  {
    singleProduct: 'Song 2',
    filePath: '/DarkenedFormation.mp3',
    url: 'www.google.cl',
    category: [
      {
        name: 'Song'
      }
    ]
  },
  {
    singleProduct: 'Song 3',
    filePath: '/DarkenedFormation.mp3',
    url: 'www.google.cl',
    category: [
      {
        name: 'Song'
      }
    ]
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  await Promise.all(
    seedInventory.map(singleProduct => {
      return Inventory.create(singleProduct, {include: [Category]})
    })
  )

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
