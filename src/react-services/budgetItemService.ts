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
    return err
  }
}

const addBudgetItem = (budgetItem: unknown): Promise<unknown> => {
  return customFetch(
    'http://localhost:3000/budgetItems',
    'POST',
    JSON.stringify(budgetItem)
  )
}

const deleteBudgetItem = (id: string): Promise<unknown> => {
  return customFetch(`http://localhost:3000/budgetItems/${id}`, 'DELETE')
}

const modifyBudgetItem = (): void => {}

const getBudgetItems = (): Promise<unknown> => {
  return customFetch('http://localhost:3000/budgetItems', 'GET')
}

export { addBudgetItem, deleteBudgetItem, modifyBudgetItem, getBudgetItems }
