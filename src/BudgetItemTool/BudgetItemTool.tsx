import { JSX, useState } from 'react'
import css from './BudgetItemTool.module.scss'
import { Form } from 'react-bootstrap'
import { CategoryItem } from '../CategoryTool/CategoryTool'
import { getCategories } from '../react-services/categoryService'
import { useEffectOnce } from 'react-use'

export type BudgetItem = {
  id: string
  name: string
  date: string
  category: string | null
  price: number
}

const BudgetItemTool = (): JSX.Element => {
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [budgetName, setBudgetName] = useState<string>('')
  const [budgetPrice, setBudgetPrice] = useState<number>()

  const getCurrentCategories = (): void => {
    getCategories().then((res) => {
      setCategories(res as CategoryItem[])
    })
  }

  useEffectOnce(() => {
    getCurrentCategories()
  })

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
              <Form.Select aria-label="Default select example">
                <option></option>
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
        </Form>
      </div>
      <div className={css.items_list}>
        <h4>Budget Items</h4>
      </div>
    </div>
  )
}

export default BudgetItemTool
