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
import {AuthProvider} from '../contexts/AuthContext.tsx'
import AdminLogin from '../components/Admin/AdminLogin.tsx'
import About from '../components/About.tsx'

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
   <AuthProvider>
  <ProductProvider>
      <StrictMode>

        <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
          <Route element={<ProtectedAdmin />}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          </Route>

          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/getsingleproduct/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />



          
        </Routes>
      </StrictMode>
    </ProductProvider>
    </AuthProvider>

  </BrowserRouter>
)
