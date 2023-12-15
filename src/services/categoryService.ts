const customFetch = async (
  url: RequestInfo | URL,
  currentMethod: string
): Promise<unknown> => {
  const requestOptions: RequestInit = {
    method: currentMethod,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

  try {
    const response = await fetch(url, requestOptions)
    return await response.json()
  } catch (err) {
    return err
  }
}

const addCategory = (): void => {}

const deleteCategory = (): void => {}

const modifyCategory = (): void => {}

const getCategories = (): Promise<unknown> => {
  return customFetch('http://localhost:3000/categories', 'GET')
}

export { addCategory, deleteCategory, modifyCategory, getCategories }
