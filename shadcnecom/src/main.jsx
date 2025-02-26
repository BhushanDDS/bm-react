import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import {UserContextProvider} from './contexts/ProductContext'
import SingleProduct from './product/SingleProduct'
import ProtectedRoute from './admin/ProtectedRoute'
import Dashboard from './admin/Dashboard'
import UpdateeProduct from './admin/UpdateeProduct'
import PostForm from './admin/PostForm'
createRoot(document.getElementById('root')).render(


  <BrowserRouter>
  <UserContextProvider>
  <StrictMode>

    <Routes>
    <Route path='/' element={<App/>} />
    <Route path='/get-single-product/:id' element={<SingleProduct/>}/>
    <Route element={<ProtectedRoute isAuthenticated={true}/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/update-product/:id' element={<UpdateeProduct/>} />
          <Route path='/post-product' element={<PostForm/>} />
          
          </Route>
    </Routes>

  </StrictMode>,
  
  </UserContextProvider>
  </BrowserRouter>
)
