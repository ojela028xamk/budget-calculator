import { JSX, useEffect, useState } from 'react'
import { BudgetItem } from '../BudgetItemTool/BudgetItemTool'
import { formatISO } from 'date-fns'
import { getBudgetItems } from '../react-services/budgetItemService'
import { Button, Form, Table } from 'react-bootstrap'
import { useEffectOnce } from 'react-use'
import css from './IncomeExpenseList.module.scss'
import { addIncomeExpense } from '../react-services/incomeExpenseService'

export interface IncomeExpenseItem extends BudgetItem {
  date: string
}

const IncomeExpenseList = (): JSX.Element => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([])
  const currentDate = formatISO(new Date(), { representation: 'date' })
  const [budgetDate, setBudgetDate] = useState<string>(currentDate)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const getCurrentBudgetItems = (): void => {
    getBudgetItems()
      .then((res) => {
        setBudgetItems(res as BudgetItem[])
      })
      .catch((err) => console.log(err))
  }

  useEffectOnce(() => {
    getCurrentBudgetItems()
  })

  useEffect(() => {
    if (budgetItems) {
      let newTotalPrice = 0
      budgetItems.map((item) => (newTotalPrice += item.price))
      setTotalPrice(newTotalPrice)
    }
  }, [budgetItems])

  const handleNewIncExpItem = (item: BudgetItem): void => {
    if (!item) return

    const newIncExpItem: IncomeExpenseItem = {
      id: item.id,
      name: item.name,
      type: item.type,
      category: item.category,
      price: item.price,
      date: budgetDate,
    }

    addIncomeExpense(newIncExpItem)
  }

  return (
    <div className={css.income_expense_list}>
      <Form>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={budgetDate}
          onChange={(event) => setBudgetDate(event.currentTarget.value)}
        />
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {budgetItems.map((item) => (
              <tr key={item.id}>
                <td>{item.type}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  {' '}
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleNewIncExpItem(item)}
                  >
                    <i className="bi bi-plus-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Form>
    </div>
  )
}

export default IncomeExpenseList
