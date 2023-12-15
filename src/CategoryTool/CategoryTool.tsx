import { Button, Form, ListGroup } from 'react-bootstrap'
import css from './CategoryTool.module.scss'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'
import {
  addCategory,
  deleteCategory,
  getCategories,
} from '../react-services/categoryService'
import { v4 as uuidv4 } from 'uuid'

export type CategoryItem = {
  id: string
  category: string
}

const CategoryTool = (): JSX.Element => {
  const [currentCategories, setCurrentCategories] = useState<CategoryItem[]>([])
  const [inputCategory, setInputCategory] = useState<string>('')

  const getCurrentCategories = (): void => {
    getCategories().then((res) => {
      setCurrentCategories(res as CategoryItem[])
    })
  }

  useEffectOnce(() => {
    getCurrentCategories()
  })

  const handleNewCategory = (newCategory: string): void => {
    const newCategoryItem: CategoryItem = {
      id: uuidv4(),
      category: newCategory,
    }
    addCategory(newCategoryItem)
    setInputCategory('')
    getCurrentCategories()
  }

  const handleDeleteCategory = (categoryId: string): void => {
    deleteCategory(categoryId)
    getCurrentCategories()
  }

  return (
    <div className={css.category_tool}>
      <Form>
        <Form.Label>Add category</Form.Label>
        <Form.Control
          type="text"
          value={inputCategory}
          placeholder="Add category"
          onChange={(event) => setInputCategory(event.currentTarget.value)}
        />
      </Form>
      <Button
        variant="primary"
        onClick={() => handleNewCategory(inputCategory)}
      >
        Add
      </Button>
      <br />
      <br />
      <ListGroup>
        {currentCategories.map((category) => (
          <ListGroup.Item key={category.id}>
            {category.category}{' '}
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDeleteCategory(category.id)}
            >
              X
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default CategoryTool
