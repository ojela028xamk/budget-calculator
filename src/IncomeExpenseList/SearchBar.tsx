import { Form, InputGroup } from 'react-bootstrap'
import { BudgetItem } from '../BudgetItemTool/BudgetItemTool'
import css from './IncomeExpenseList.module.scss'

type SearchBarProps = {
  items: BudgetItem[]
  newItems: React.Dispatch<React.SetStateAction<BudgetItem[]>>
}

const SearchBar = ({ items, newItems }: SearchBarProps): JSX.Element => {
  const handleSearch = (searchWord: string): void => {
    const searchItems = items.filter((item) =>
      item.name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase())
    )
    newItems(searchItems)
  }

  return (
    <div className={css.searchbar}>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          <i className="bi bi-search"></i>
        </InputGroup.Text>
        <Form.Control
          placeholder="Search"
          aria-describedby="basic-addon1"
          onChange={(event) => handleSearch(event.currentTarget.value)}
        />
      </InputGroup>
    </div>
  )
}

export default SearchBar
