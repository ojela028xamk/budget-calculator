import { JSX, useState } from 'react'
import css from './BudgetItemTool.module.scss'
import { Button, Form, Table } from 'react-bootstrap'
import { CategoryItem } from '../CategoryTool/CategoryTool'
import { getCategories } from '../react-services/categoryService'
import { useEffectOnce } from 'react-use'
import { v4 as uuidv4 } from 'uuid'
import {
  addBudgetItem,
  getBudgetItems,
} from '../react-services/budgetItemService'

export type BudgetItem = {
  id: string
  name: string
  date: Date
  category: string | null
  price: number
}

const BudgetItemTool = (): JSX.Element => {
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([])

  // New budget item values
  const [budgetName, setBudgetName] = useState<string>('')
  const [budgetPrice, setBudgetPrice] = useState<number>(0)
  const [budgetCategory, setBudgetCategory] = useState<string>('')

  const getCurrentCategories = (): void => {
    getCategories().then((res) => {
      setCategories(res as CategoryItem[])
    })
  }

  const getCurrentBudgetItems = (): void => {
    getBudgetItems().then((res) => {
      setBudgetItems(res as BudgetItem[])
    })
  }

  useEffectOnce(() => {
    getCurrentCategories()
    getCurrentBudgetItems()
  })

  const handleNewBudgetItem = (): void => {
    const newBudgetItem: BudgetItem = {
      id: uuidv4(),
      name: budgetName,
      date: new Date(),
      category: budgetCategory ? budgetCategory : null,
      price: budgetPrice,
    }

    addBudgetItem(newBudgetItem)
    setBudgetName('')
    setBudgetPrice(0)
    getCurrentBudgetItems()
  }

  return (
    <div className={css.budget_item_tool}>
      <div className={css.add_item}>
        <h4>Add Item</h4>
        <Form>
          <Form.Label>Item name</Form.Label>
          <Form.Control
            type="text"
            value={budgetName}
            placeholder="Add item"
            onChange={(event) => setBudgetName(event.currentTarget.value)}
          />
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={budgetPrice}
            placeholder="Add price"
            onChange={(event) =>
              setBudgetPrice(Number(event.currentTarget.value))
            }
          />
          <Form.Label>Category</Form.Label>
          {categories.length ? (
            <>
              <Form.Select
                aria-label="Default select example"
                onChange={(event) =>
                  setBudgetCategory(event.currentTarget.value)
                }
              >
                <option value={''}></option>
                {categories.map((category) => (
                  <option key={category.id} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </Form.Select>
            </>
          ) : (
            <Form.Control
              type="text"
              placeholder="No categories"
              disabled
              readOnly
            />
          )}
          <br />
          <Button variant="primary" onClick={handleNewBudgetItem}>
            Add
          </Button>
        </Form>
      </div>
      <div className={css.items_list}>
        <h4>Budget Items</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {budgetItems.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.date).toDateString()}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default BudgetItemTool
