'use strict'
const {db, User, Inventory, Category} = require('../server/db/models')

const seedCategories = [
  {
    name: 'Hat',
    image:
      'https://image.iol.co.za/image/1/process/620x349?source=https://inm-baobab-prod-eu-west-1.s3.amazonaws.com/public/inm/media/2017/11/08/iol/582/beyonce-formation-variance-magazine-7291.jpg&operation=CROP&offset=0x12&resize=838x469',
    inventories: [
      {
        item: 'Hat 1',
        filePath: '/DarkenedFormation.png',
        url: 'www.google.com'
      },
      {
        item: 'Hat 2',
        filePath: '/DarkenedFormation2.png',
        url: 'www.google.com'
      },
      {
        item: 'Hat 3',
        filePath: '/DarkenedFormation3.png',
        url: 'www.google.com'
      }
    ]
  },
  {
    name: 'Dress',
    image:
      'https://hips.hearstapps.com/elleuk.cdnds.net/15/37/2048x2730/2048x2730-e6-a19a-6ddc829b9cee-assets-elleuk-com-gallery-16631-1369240729-beyonce-38-aaavm465-wenn-feb2013-jpg.jpg',
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
        item: 'Beyoncé - Run the World (Girls) (Video - Main Version)',
        filePath: '/DarkenedFormation.png',
        url: 'https://youtu.be/VBmMU_iwe6U'
      },
      {
        item: 'Beyoncé - Single Ladies (Put a Ring on It) (Video Version)',
        filePath: '/DarkenedFormation2.png',
        url: 'https://youtu.be/4m1EFMoRFvY'
      },
      {
        item: 'Beyoncé - Crazy In Love ft. JAY Z',
        filePath: '/DarkenedFormation3.png',
        url: 'https://youtu.be/ViwtNLUqkMY'
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
