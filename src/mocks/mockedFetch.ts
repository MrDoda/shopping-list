import { appStore } from '../store/appStore'
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
    const id = path.substring('/shopping-list/'.length)
    const shoppingList = shoppingListArray.find((list) => list.id === id)

    if (!shoppingList) {
      await delay(100)
      return createMockResponse({ message: 'Not Found' }, 404)
    }

    const userId = appStore.getState().user?.id

    const hasAccess =
      shoppingList.ownerId === userId ||
      shoppingList.members.some((member) => member.id === userId)

    if (hasAccess) {
      await delay(100)
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
  } else {
    await delay(100)
    return createMockResponse({ message: 'Not Found' }, 404)
  }
}
