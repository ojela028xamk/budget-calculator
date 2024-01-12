import { JSX, useState } from 'react'
import CategoryTool from './CategoryTool/CategoryTool'
import css from './App.module.scss'
import BudgetItemTool from './BudgetItemTool/BudgetItemTool'
import { Container, Nav, Navbar } from 'react-bootstrap'
import IncomeExpenseList from './IncomeExpenseList/IncomeExpenseList'

const App = (): JSX.Element => {
  const [showCategoryTool, setShowCategoryTool] = useState<boolean>(true)
  const [showBudgetItemTool, setShowBudgetItemTool] = useState<boolean>(false)
  const [showIncomeExpenseList, setShowIncomeExpenseList] =
    useState<boolean>(false)

  const handleNavigation = (
    showCategory: boolean,
    showBudget: boolean,
    showIncome: boolean
  ): void => {
    setShowCategoryTool(showCategory)
    setShowBudgetItemTool(showBudget)
    setShowIncomeExpenseList(showIncome)
  }

  return (
    <div className={css.App}>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Budget Calculator</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavigation(true, false, false)}>
              Category Tool
            </Nav.Link>
            <Nav.Link onClick={() => handleNavigation(false, true, false)}>
              Budget Item Tool
            </Nav.Link>
            <Nav.Link onClick={() => handleNavigation(false, false, true)}>
              Income Expense List
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {showCategoryTool && <CategoryTool />}
      {showBudgetItemTool && <BudgetItemTool />}
      {showIncomeExpenseList && <IncomeExpenseList />}
    </div>
  )
}

export default App
