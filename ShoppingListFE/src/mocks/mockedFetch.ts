import { shoppingListObject } from './shopping-list'

export async function mockedFetch(
  input: RequestInfo,
  init?: any
): Promise<Response> {
  const url = typeof input === 'string' ? input : input.url
  const method = init?.method || 'GET'
  const body = init?.body ? JSON.parse(init.body as string) : undefined
  const token = init?.headers?.['x-authenticate']

  const mockedResponses: Record<string, () => Response> = {
    '/shopping-list/1': () => {
      if (token == 'owner') {
        return createMockResponse(shoppingListObject, 200)
      }

      if (token == 'member') {
        return createMockResponse(shoppingListObject, 200)
      }

      return createMockResponse({ message: 'Not Found' }, 404)
    },
  }

  const urlObj = new URL(url, window.location.origin)
  const path = urlObj.pathname

  const mockResponse = mockedResponses[path]

  console.log('Fetching: ', {
    url,
    method,
    body,
    token,
    path,
    input,
  })

  if (mockResponse) {
    await delay(100)
    return mockResponse()
  } else {
    return createMockResponse({ message: 'Not Found' }, 404)
  }
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

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
