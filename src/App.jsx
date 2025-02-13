import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Counter: {count}</h1>
        <button 
          className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setCount(count + 1)}
        >
          Increment X
        </button>
      </div>
    </div>
  )
}

export default App
