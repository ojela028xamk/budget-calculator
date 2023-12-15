import css from './App.module.scss'
import CategoryTool from './CategoryTool/CategoryTool'

const App = (): JSX.Element => {
  return (
    <div className={css.App}>
      <CategoryTool />
    </div>
  )
}

export default App
