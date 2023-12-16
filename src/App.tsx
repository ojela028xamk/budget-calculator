import { JSX } from 'react'
import CategoryTool from './CategoryTool/CategoryTool'
import css from './App.module.scss'

const App = (): JSX.Element => {
  return (
    <div className={css.App}>
      <CategoryTool />
    </div>
  )
}

export default App
