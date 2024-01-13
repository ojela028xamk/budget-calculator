import { JSX, useEffect, useState } from 'react'
import { BudgetItem, BudgetType } from '../BudgetItemTool/BudgetItemTool'
import { formatISO } from 'date-fns'
import { getBudgetItems } from '../react-services/budgetItemService'
import { Button, Form, Table } from 'react-bootstrap'
import { useEffectOnce } from 'react-use'
import { v4 as uuidv4 } from 'uuid'
import css from './IncomeExpenseList.module.scss'
import {
  addIncomeExpense,
  deleteIncomeExpense,
  getIncomeExpense,
} from '../react-services/incomeExpenseService'

export interface IncomeExpenseItem extends BudgetItem {
  date: string
}

const IncomeExpenseList = (): JSX.Element => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([])
  const [incExpItems, setIncExpItems] = useState<IncomeExpenseItem[]>([])
  const currentDate = formatISO(new Date(), { representation: 'date' })
  const [budgetDate, setBudgetDate] = useState<string>(currentDate)
  const [totalBalance, setTotalBalance] = useState<number>(0)

  const getCurrentBudgetItems = (): void => {
    getBudgetItems()
      .then((res) => {
        setBudgetItems(res as BudgetItem[])
      })
      .catch((err) => console.log(err))
  }

  const getCurrentIncExpItems = (): void => {
    getIncomeExpense()
      .then((res) => {
        setIncExpItems(res as IncomeExpenseItem[])
      })
      .catch((err) => console.log(err))
  }

  useEffectOnce(() => {
    getCurrentBudgetItems()
    getCurrentIncExpItems()
  })

  useEffect(() => {
    if (incExpItems) {
      let newTotalPrice = 0
      incExpItems.map((item) => {
        if (item.type === BudgetType.INCOME) {
          newTotalPrice += item.price
        }
        if (item.type === BudgetType.EXPENSE) {
          newTotalPrice -= item.price
        }
      })
      setTotalBalance(newTotalPrice)
    }
  }, [incExpItems])

  const handleNewIncExpItem = (item: BudgetItem): void => {
    if (!item) return

    const newIncExpItem: IncomeExpenseItem = {
      id: uuidv4(),
      name: item.name,
      type: item.type,
      category: item.category,
      price: item.price,
      date: budgetDate,
    }

    addIncomeExpense(newIncExpItem)
      .then(() => {
        getCurrentIncExpItems()
      })
      .catch((err) => console.log(err))
  }

  const handleDeleteIncExpItem = (itemId: string): void => {
    deleteIncomeExpense(itemId)
      .then(() => {
        getCurrentIncExpItems()
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={css.income_expense_list}>
      <h2>Add budget item to list</h2>
      <Form>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={budgetDate}
          onChange={(event) => setBudgetDate(event.currentTarget.value)}
        />
        <br />
        <div className={css.table_list}>
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
                  <td
                    className={
                      item.type === BudgetType.INCOME ? css.income : css.expense
                    }
                  >
                    <b>{item.type}</b>
                  </td>
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
        </div>
        <br />
      </Form>
      <h2>Income Expense List</h2>
      <div className={css.table_list}>
        {' '}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            {incExpItems.map((item) => (
              <tr key={item.id}>
                <td
                  className={
                    item.type === BudgetType.INCOME ? css.income : css.expense
                  }
                >
                  <b>{item.type}</b>
                </td>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  {' '}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteIncExpItem(item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
                <b>TOTAL</b>
              </td>
              <td>
                <b>{totalBalance.toFixed(2)}</b>
              </td>
              <td></td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </div>
  )
}

export default IncomeExpenseList
