import { CategoryItem } from '../CategoryTool/CategoryTool'

const customFetch = async (
  url: RequestInfo | URL,
  currentMethod: string,
  currentBody?: BodyInit
): Promise<unknown> => {
  const requestOptions: RequestInit = {
    method: currentMethod,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: currentBody || null,
  }

  try {
    const response = await fetch(url, requestOptions)
    return await response.json()
  } catch (err) {
    throw err
  }
}

const addCategory = (category: CategoryItem): Promise<unknown> => {
  return customFetch(
    'http://localhost:3000/categories',
    'POST',
    JSON.stringify(category)
  )
}

const deleteCategory = (id: string): Promise<unknown> => {
  return customFetch(`http://localhost:3000/categories/${id}`, 'DELETE')
}

const modifyCategory = (): void => {}

const getCategories = (): Promise<unknown> => {
  return customFetch('http://localhost:3000/categories', 'GET')
}

export { addCategory, deleteCategory, modifyCategory, getCategories }
