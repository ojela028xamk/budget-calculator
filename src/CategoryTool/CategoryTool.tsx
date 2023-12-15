import { Button, Form } from 'react-bootstrap'
import css from './CategoryTool.module.scss'
import { useState } from 'react'

const CategoryTool = (): JSX.Element => {
  const [newCategory, setNewCategory] = useState<string>('')

  const addCategory = (category: string): void => {
    console.log(category)
  }

  const deleteCategory = (category: string): void => {}

  return (
    <div className={css.category_tool}>
      <Form>
        <Form.Label>Add category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Add category"
          onChange={(event) => setNewCategory(event.currentTarget.value)}
        />
      </Form>
      <Button variant="primary" onClick={() => addCategory(newCategory)}>
        Add
      </Button>
    </div>
  )
}

export default CategoryTool
