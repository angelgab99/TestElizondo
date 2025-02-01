import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { List } from './components/List'
import { Create } from './components/Create'
import { Edit } from './components/Edit'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<List/>}/>
        <Route path='/crear' element={<Create/>}/>
        <Route path='/update/:id' element={<Edit/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
