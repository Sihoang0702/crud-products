
import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './Pages/Home'
import List from './Pages/List'
import Add from './Pages/Add'
import Edit from './Pages/Edit'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='products' element={<List/>}/>
      <Route path='products/add' element={<Add/>}/>
      <Route path='products/:id/edit' element={<Edit/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='signin' element={<Signin/>}/>
    </Routes>
    
    </> 
  )
}

export default App
