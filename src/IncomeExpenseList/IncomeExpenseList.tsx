import { JSX, useEffect, useState } from 'react'
import { BudgetItem } from '../BudgetItemTool/BudgetItemTool'
import { formatISO } from 'date-fns'
import css from './IncomeExpenseList.module.scss'
import { getBudgetItems } from '../react-services/budgetItemService'
import { Form } from 'react-bootstrap'
import { useEffectOnce } from 'react-use'

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

  return (
    <div className={css.income_expense_list}>
      <Form>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={budgetDate}
          onChange={(event) => setBudgetDate(event.currentTarget.value)}
        />
      </Form>
    </div>
  )
}

export default IncomeExpenseList
