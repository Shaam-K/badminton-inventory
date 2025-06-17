import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import ViewRacquet from './Pages/ViewRacquet'
import CreateRacquet from './Pages/CreateRacquet'
import UpdateRacquet from './Pages/UpdateRacquet'
import DeleteRacquet from './Pages/DeleteRacquet'
import Brands from './Pages/Brands'
import BrandUpdate from './Pages/BrandUpdate'
import BrandDelete from './Pages/BrandDelete'

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id/get' element={<ViewRacquet/>} />
        <Route path='/create' element={<CreateRacquet />} />
        <Route path='/:id/update' element={<UpdateRacquet/>} />
        <Route path='/:id/delete' element={<DeleteRacquet/>} />
        <Route path='/brands' element={<Brands/>} />
        <Route path='/brands/:id/update/:name' element={<BrandUpdate/>} />
        <Route path='/brands/:id/delete/:name' element={<BrandDelete/>} />
      </Routes>
    </Router>
  )
}

export default App
