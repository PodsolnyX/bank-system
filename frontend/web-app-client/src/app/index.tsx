import { StoreProvider } from 'shared/store'
import { ApplicationRouter } from './router'

function App() {
  return (
    <StoreProvider>
      <ApplicationRouter />
    </StoreProvider>
  )
}

export default App
