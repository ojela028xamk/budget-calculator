import { JSX, useEffect, useState } from 'react'
import css from './BudgetItemTool.module.scss'
import { Button, Form, Table } from 'react-bootstrap'
import { CategoryItem } from '../CategoryTool/CategoryTool'
import { getCategories } from '../react-services/categoryService'
import { useEffectOnce } from 'react-use'
import { v4 as uuidv4 } from 'uuid'
import {
  addBudgetItem,
  deleteBudgetItem,
  getBudgetItems,
} from '../react-services/budgetItemService'
import { formatISO } from 'date-fns'

export enum BudgetType {
  INCOME = 'Income',
  EXPENSE = 'Expense',
}

export type BudgetItem = {
  id: string
  name: string
  type: BudgetType
  category: string | null
  price: number
}

const BudgetItemTool = (): JSX.Element => {
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([])
  // const currentDate = formatISO(new Date(), { representation: 'date' })

  // New budget item values
  const [budgetName, setBudgetName] = useState<string>('')
  const [budgetType, setBudgetType] = useState<BudgetType>(BudgetType.EXPENSE)
  const [budgetCategory, setBudgetCategory] = useState<string>('')
  const [budgetPrice, setBudgetPrice] = useState<number>(0)

  // const [budgetDate, setBudgetDate] = useState<string>(currentDate)
  // const [totalPrice, setTotalPrice] = useState<number>(0)

  const getCurrentCategories = (): void => {
    getCategories()
      .then((res) => {
        setCategories(res as CategoryItem[])
      })
      .catch((err) => console.log(err))
  }

  const getCurrentBudgetItems = (): void => {
    getBudgetItems()
      .then((res) => {
        setBudgetItems(res as BudgetItem[])
      })
      .catch((err) => console.log(err))
  }

  useEffectOnce(() => {
    getCurrentCategories()
    getCurrentBudgetItems()
  })

  /* useEffect(() => {
    if (budgetItems) {
      let newTotalPrice = 0
      budgetItems.map((item) => (newTotalPrice += item.price))
      setTotalPrice(newTotalPrice)
    }
  }, [budgetItems]) */

  const handleNewBudgetItem = (): void => {
    const newBudgetItem: BudgetItem = {
      id: uuidv4(),
      name: budgetName,
      type: budgetType,
      category: budgetCategory ? budgetCategory : null,
      price: budgetPrice,
    }

    addBudgetItem(newBudgetItem)
      .then(() => {
        setBudgetName('')
        setBudgetPrice(0)
        getCurrentBudgetItems()
      })
      .catch((err) => console.log(err))
  }

  const handleDeleteBudgetItem = (itemId: string): void => {
    deleteBudgetItem(itemId)
      .then(() => {
        getCurrentBudgetItems()
      })
      .catch((err) => console.log(err))
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
          <Form.Label>Type</Form.Label>
          <br />
          {Object.values(BudgetType).map((type) => (
            <Form.Check
              key={type}
              inline
              label={type}
              type="radio"
              checked={type === budgetType}
              onChange={() => setBudgetType(type)}
            />
          ))}
          {/* <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={budgetDate}
            onChange={(event) => setBudgetDate(event.currentTarget.value)}
          /> */}
          <br />
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
              <th>Type</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>
                <i className="bi bi-trash"></i>
              </th>
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
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteBudgetItem(item.id)}
                  >
                    X
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
            <tr>
              <td colSpan={3}>
                <h5>Total</h5>
              </td>
              <td>
                <b>{totalPrice.toFixed(2)}</b>
              </td>
              <td></td>
            </tr>
          </tfoot> */}
        </Table>
      </div>
    </div>
  )
}

export default BudgetItemTool
