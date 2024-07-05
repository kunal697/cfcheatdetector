import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'
import { UserIdProvider } from './components/UserIdContext'
import Cheated from './components/Cheated'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <UserIdProvider>
    < Card/>
    <Cheated />
    </UserIdProvider>
    
  )
}

export default App
