import { mockedFetch } from '../mocks/mockedFetch.js'
import { appStore } from '../store/appStore.js'

export async function request<T>(
  path: string,
  data?: Record<string, any>,
  method = 'POST',
  token = appStore.getState().token
): Promise<[Error | null, T | null]> {
  const apiUrl = import.meta.env.VITE_API_URL
  const fullUrl = `${apiUrl}/${path}`

  let browserFetch = fetch

  if (apiUrl === 'http://mock.service') {
    ;(browserFetch as any) = mockedFetch
  }

  try {
    const fetchData: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-authenticate': token || '',
      },
    }

    if (data !== undefined) {
      fetchData.body = JSON.stringify(data)
    }

    const response = await browserFetch(fullUrl, fetchData)

    if (!response.ok) {
      try {
        const result = await response.json()
        return [new Error(result.message), null]
      } catch {
        throw new Error(
          `API call failed: ${response.status} - ${response.statusText}`
        )
      }
    }

    const result: T = await response.json()
    return [null, result]
  } catch (error) {
    return [error as Error, null]
  }
}
