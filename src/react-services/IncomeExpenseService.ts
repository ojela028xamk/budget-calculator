import { IncomeExpenseItem } from '../IncomeExpenseList/IncomeExpenseList'

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

const addIncomeExpense = (item: IncomeExpenseItem): Promise<unknown> => {
  return customFetch(
    'http://localhost:3000/incomeExpense',
    'POST',
    JSON.stringify(item)
  )
}

const deleteIncomeExpense = (id: string): Promise<unknown> => {
  return customFetch(`http://localhost:3000/incomeExpense/${id}`, 'DELETE')
}

const modifyIncomeExpense = (): void => {}

const getIncomeExpense = (): Promise<unknown> => {
  return customFetch('http://localhost:3000/incomeExpense', 'GET')
}

export {
  addIncomeExpense,
  deleteIncomeExpense,
  modifyIncomeExpense,
  getIncomeExpense,
}
