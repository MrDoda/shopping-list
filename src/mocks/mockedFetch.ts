import { appStore } from '../store/appStore'
import { owner } from './owner'
import { shoppingListArray } from './shopping-list-array'
import { users } from './users'

export async function mockedFetch(
  input: RequestInfo,
  init?: any
): Promise<Response> {
  const url = typeof input === 'string' ? input : input.url
  const method = init?.method || 'GET'
  const body = init?.body ? JSON.parse(init.body as string) : undefined
  const token = init?.headers?.['x-authenticate']

  const urlObj = new URL(url, window.location.origin)
  const path = urlObj.pathname

  console.log('Fetching: ', {
    url,
    method,
    body,
    token,
    path,
    input,
  })

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  function createMockResponse(body: any, status: number): Response {
    const responseInit: ResponseInit = {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    console.log('response: ', {
      responseInit,
      body,
    })
    const blob = new Blob([JSON.stringify(body)], { type: 'application/json' })

    return new Response(blob, responseInit)
  }

  if (path.startsWith('/shopping-list/')) {
    const id = path.split('/')[2]
    const shoppingList = shoppingListArray.find((list) => list.id === id)

    if (!shoppingList) {
      await delay(100)
      return createMockResponse({ message: 'Not Found' }, 404)
    }

    const userId = appStore.getState().user?.id

    if (path.endsWith('/member')) {
      if (method === 'POST') {
        const newMember = { ...body }
        shoppingList.members = shoppingList.members || []
        const isAlreadyMember = shoppingList.members.some(
          (member) => member.id === newMember.id
        )
        if (isAlreadyMember) {
          await delay(100)
          return createMockResponse(
            { message: 'Member already exists in the shopping list.' },
            400
          )
        }
        shoppingList.members.push(newMember)
        await delay(100)
        return createMockResponse(newMember, 201)
      }

      if (method === 'DELETE') {
        const memberId = body?.id
        const memberIndex = shoppingList.members?.findIndex(
          (member) => member.id === memberId
        )
        if (memberIndex === -1 || memberIndex === undefined) {
          await delay(100)
          return createMockResponse({ message: 'Member not found.' }, 404)
        }
        shoppingList.members.splice(memberIndex, 1)
        await delay(100)
        return createMockResponse(
          { message: 'Member removed successfully.' },
          200
        )
      }
    }

    if (path.endsWith('/item')) {
      if (method === 'POST') {
        const newItem = { id: String(Math.random()), ...body }
        shoppingList.items = shoppingList.items || []
        shoppingList.items.push(newItem)
        await delay(100)
        return createMockResponse(newItem, 201)
      }

      const itemId = body?.id
      const item = shoppingList.items?.find((item) => item.id === itemId)

      if (!item) {
        await delay(100)
        return createMockResponse({ message: 'Item not found.' }, 404)
      }

      if (method === 'PATCH') {
        Object.assign(item, body)
        await delay(100)
        return createMockResponse(item, 200)
      } else if (method === 'DELETE') {
        shoppingList.items =
          shoppingList.items?.filter((item) => item.id !== itemId) || []
        await delay(100)
        return createMockResponse({ message: 'Deleted successfully' }, 200)
      }
    }

    if (method === 'DELETE') {
      const hasAccess =
        shoppingList.ownerId === userId ||
        shoppingList.members.some((member) => member.id === userId)

      if (hasAccess) {
        const index = shoppingListArray.findIndex((list) => list.id === id)
        if (index !== -1) {
          shoppingListArray.splice(index, 1)
        }
        await delay(100)
        return createMockResponse({ message: 'Deleted successfully' }, 200)
      } else {
        await delay(100)
        return createMockResponse({ message: 'Unauthorized access.' }, 403)
      }
    }

    const hasAccess =
      shoppingList.ownerId === userId ||
      shoppingList.members.some((member) => member.id === userId)

    if (hasAccess) {
      await delay(1000)
      return createMockResponse(shoppingList, 200)
    } else {
      await delay(100)
      return createMockResponse({ message: 'Not Found' }, 404)
    }
  } else if (path === '/shopping-list') {
    const userId = appStore.getState().user?.id

    if (!userId) {
      await delay(100)
      return createMockResponse({ message: 'Unauthorized access.' }, 403)
    }

    if (method === 'POST') {
      const newShoppingList = { id: String(Math.random()), ...body }
      shoppingListArray.push(newShoppingList)
      return createMockResponse(newShoppingList, 201)
    }

    const filteredLists = shoppingListArray.filter(
      (list) =>
        list.ownerId === userId ||
        list.members.some((member) => member.id === userId)
    )

    await delay(100)
    return createMockResponse(filteredLists, 200)
  } else if (path === '/user/') {
    if (token === 'owner' || token === 'member') {
      await delay(100)
      return createMockResponse(users, 200)
    }
    await delay(100)
    return createMockResponse({ message: 'Unauthorized access.' }, 403)
  } else if (path === '/auth/login') {
    return createMockResponse(
      {
        token: 'owner',
      },
      200
    )
  } else if (path === '/user/me') {
    return createMockResponse(owner, 200)
  } else {
    await delay(100)
    return createMockResponse({ message: 'Not Found' }, 404)
  }
}
