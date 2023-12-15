import { Button, Form, ListGroup } from 'react-bootstrap'
import css from './CategoryTool.module.scss'
import { useState } from 'react'
import { useMount } from 'react-use'
import { getCategories } from '../services/categoryService'

const CategoryTool = (): JSX.Element => {
  const [newCategory, setNewCategory] = useState<string>('')

  useMount(() => {
    getCategories().then((res) => console.log(res))
  })

  const handleNewCategory = (category: string): void => {
    console.log(category)
  }

  const handleDeleteCategory = (category: string): void => {}

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
      <Button variant="primary" onClick={() => handleNewCategory(newCategory)}>
        Add
      </Button>
      <br />
      <br />
      <ListGroup>
        <ListGroup.Item>Testi</ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default CategoryTool
