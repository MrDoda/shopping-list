
# Project Setup

## Installation

1. Install dependencies:
   ```bash
   npm i
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Create a `.env` file from the example:
   ```bash
   cp .env-example .env
   ```

## Mocking Requests

- If `VITE_API_URL` in `.env` is set to `http://mock.service`, all API requests are automatically mocked.

### Mock Implementation

- Mocked Fetch: `src/mocks/mockedFetch.ts`
- Request Logic: `src/api/request.ts`


[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/NFyysC9E)
