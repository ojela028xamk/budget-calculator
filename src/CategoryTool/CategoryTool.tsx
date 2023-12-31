import { Button, Form, ListGroup } from 'react-bootstrap'
import { useState, JSX } from 'react'
import { useEffectOnce } from 'react-use'
import {
  addCategory,
  deleteCategory,
  getCategories,
} from '../react-services/categoryService'
import { v4 as uuidv4 } from 'uuid'
import css from './CategoryTool.module.scss'

export type CategoryItem = {
  id: string
  category: string
}

const CategoryTool = (): JSX.Element => {
  const [currentCategories, setCurrentCategories] = useState<CategoryItem[]>([])
  const [inputCategory, setInputCategory] = useState<string>('')

  const getCurrentCategories = (): void => {
    getCategories()
      .then((res) => {
        setCurrentCategories(res as CategoryItem[])
      })
      .catch((err) => console.log(err))
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
      .then(() => {
        setInputCategory('')
        getCurrentCategories()
      })
      .catch((err) => console.log(err))
  }

  const handleDeleteCategory = (categoryId: string): void => {
    deleteCategory(categoryId)
      .then(() => {
        getCurrentCategories()
      })
      .catch((err) => console.log(err))
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
      <ListGroup className={css.category_tool_list}>
        {currentCategories.map((category) => (
          <ListGroup.Item key={category.id}>
            <span>{category.category} </span>
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
