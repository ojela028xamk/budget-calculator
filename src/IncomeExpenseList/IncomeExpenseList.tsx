import { JSX } from 'react'
import { BudgetItem } from '../BudgetItemTool/BudgetItemTool'

export interface IncomeExpenseItem extends BudgetItem {
  date: string
}

const IncomeExpenseList = (): JSX.Element => {
  return (
    <div>
      <h2>Income Expense List</h2>
    </div>
  )
}

export default IncomeExpenseList
