import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

import {fetchCloset, fetchCategories, fetchCategory} from './closet'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators - Closet', () => {
  let store
  let mockAxios

  const initialState = {closet: [], categories: [], category: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchCloset', () => {
    it('dispatch Get Closet Action', async () => {
      const fakeCloset = {
        id: 1,
        item: 'Dress 1',
        filePath: '/DarkenedFormation.png',
        url: 'www.google.com',
        createdAt: '2019-05-04T22:20:19.815Z',
        updatedAt: '2019-05-04T22:20:19.815Z',
        categoryId: 1
      }
      mockAxios.onGet('/api/closet').replyOnce(200, fakeCloset)
      await store.dispatch(fetchCloset())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('LOADING_DATA')
      expect(actions[1].type).to.be.equal('GET_CLOSET')
      expect(actions[1].item.data).to.be.deep.equal(fakeCloset)
    })
  })

  describe('fetchCategories', () => {
    it('dispatch Get Categories Action', async () => {
      const fakeCategories = [
        {
          id: 1,
          name: 'Dress',
          image:
            'https://hips.hearstapps.com/elleuk.cdnds.net/15/37/2048x2730/2048x2730-e6-a19a-6ddc829b9cee-assets-elleuk-com-gallery-16631-1369240729-beyonce-38-aaavm465-wenn-feb2013-jpg.jpg',
          createdAt: '2019-05-04T22:20:19.763Z',
          updatedAt: '2019-05-04T22:20:19.763Z'
        },
        {
          id: 2,
          name: 'Hat',
          image:
            'https://image.iol.co.za/image/1/process/620x349?source=https://inm-baobab-prod-eu-west-1.s3.amazonaws.com/public/inm/media/2017/11/08/iol/582/beyonce-formation-variance-magazine-7291.jpg&operation=CROP&offset=0x12&resize=838x469',
          createdAt: '2019-05-04T22:20:19.761Z',
          updatedAt: '2019-05-04T22:20:19.761Z'
        },
        {
          id: 3,
          name: 'BodySuit',
          image:
            'https://cdn.fashionmagazine.com/wp-content/uploads/2013/08/Beyonce-Mrs-Carter-World-Tour-Ralph-Russo-Bodysuit-480x0-c-default.jpg',
          createdAt: '2019-05-04T22:20:19.763Z',
          updatedAt: '2019-05-04T22:20:19.763Z'
        },
        {
          id: 4,
          name: 'Songs',
          image: 'https://media.timeout.com/images/105252649/630/472/image.jpg',
          createdAt: '2019-05-04T22:20:19.763Z',
          updatedAt: '2019-05-04T22:20:19.763Z'
        }
      ]

      mockAxios.onGet('/api/category').replyOnce(200, fakeCategories)
      await store.dispatch(fetchCategories())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('LOADING_DATA')
      expect(actions[1].type).to.be.equal('GET_CATEGORIES')
      expect(actions[1].categories.data).to.be.deep.equal(fakeCategories)
    })
  })

  describe('fetchCategory', () => {
    it('dispatch Get Category Action', async () => {
      const fakeCategory = [
        {
          id: 1,
          name: 'Dress',
          image:
            'https://hips.hearstapps.com/elleuk.cdnds.net/15/37/2048x2730/2048x2730-e6-a19a-6ddc829b9cee-assets-elleuk-com-gallery-16631-1369240729-beyonce-38-aaavm465-wenn-feb2013-jpg.jpg',
          createdAt: '2019-05-04T22:20:19.763Z',
          updatedAt: '2019-05-04T22:20:19.763Z',
          inventories: [
            {
              id: 1,
              item: 'Dress 1',
              filePath: '/DarkenedFormation.png',
              url: 'www.google.com',
              createdAt: '2019-05-04T22:20:19.815Z',
              updatedAt: '2019-05-04T22:20:19.815Z',
              categoryId: 1
            },
            {
              id: 2,
              item: 'Dress 2',
              filePath: '/DarkenedFormation2.png',
              url: 'www.google.com',
              createdAt: '2019-05-04T22:20:19.815Z',
              updatedAt: '2019-05-04T22:20:19.815Z',
              categoryId: 1
            },
            {
              id: 3,
              item: 'Dress 3',
              filePath: '/DarkenedFormation3.png',
              url: 'www.google.com',
              createdAt: '2019-05-04T22:20:19.815Z',
              updatedAt: '2019-05-04T22:20:19.815Z',
              categoryId: 1
            }
          ]
        }
      ]
      let categoryId = 1
      mockAxios.onGet(`/api/category/${categoryId}`).replyOnce(200, fakeCategory)
      await store.dispatch(fetchCategory(categoryId))
      const actions = store.getActions()

      expect(actions[0].type).to.be.equal('LOADING_DATA')
      expect(actions[1].type).to.be.equal('GET_CATEGORY')
      expect(actions[1].category.data).to.be.deep.equal(fakeCategory)
    })
  })
})
