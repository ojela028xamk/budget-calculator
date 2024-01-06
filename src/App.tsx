import { JSX, useState } from 'react'
import CategoryTool from './CategoryTool/CategoryTool'
import css from './App.module.scss'
import BudgetItemTool from './BudgetItemTool/BudgetItemTool'
import { Container, Nav, Navbar } from 'react-bootstrap'

const App = (): JSX.Element => {
  const [showCategoryTool, setShowCategoryTool] = useState<boolean>(false)
  const [showBudgetItemTool, setShowBudgetItemTool] = useState<boolean>(true)

  const handleNavigation = (
    showCategory: boolean,
    showBudget: boolean
  ): void => {
    setShowCategoryTool(showCategory)
    setShowBudgetItemTool(showBudget)
  }

  return (
    <div className={css.App}>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Budget Calculator</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavigation(true, false)}>
              Category Tool
            </Nav.Link>
            <Nav.Link onClick={() => handleNavigation(false, true)}>
              Budget Item Tool
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {showCategoryTool && <CategoryTool />}
      {showBudgetItemTool && <BudgetItemTool />}
    </div>
  )
}

export default App
