import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ProductProvider} from '../contexts/ProductContext.tsx'
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import SingleProduct from '../components/SingleProduct'
import ProtectedAdmin from '../components/Admin/ProtectedAdmin.tsx'
import Dashboard from '../components/Admin/Dashboard.tsx'
import Cart from '../components/Cart.tsx'

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
  
  <ProductProvider>
      <StrictMode>
        <Routes>
          <Route element={<ProtectedAdmin isAuthenticated={true}/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>

          </Route>

          <Route path="/" element={<App />} />
          <Route path="/getsingleproduct/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />



          
        </Routes>
      </StrictMode>
    </ProductProvider>

  </BrowserRouter>
)
