import { ChakraProvider, ColorModeScript,extendTheme } from "@chakra-ui/react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'
import Dashboard from './components/Dashboard.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginForm from '././components/LoginForm.jsx'
import SingleProduct from "./components/admin/SingleProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import CreateProduct from "./components/admin/CreateProduct";
import UserDashboard from "./components/user/UserDashboad";
import SingleUser from "./components/user/SingleUser";
import CreateUser from "./components/user/CreateUser";
import CartDashboard from "./components/cart/CartDashboard";
import SingleOrder from "./components/cart/SingleOrder";
import UpdateUser from "./components/user/UpdateUser";
import UpdateOrder from "./components/cart/UpdateOrder";
import CreateCart from "./components/cart/CreateCart";


const queryClient = new QueryClient();
const theme = extendTheme({
  config: {
    initialColorMode: "dark",  
    useSystemColorMode: false, 
  },
});

createRoot(document.getElementById('root')).render(

  <StrictMode>
      <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
  <BrowserRouter>
  
  <QueryClientProvider client={queryClient}>

  <Routes>
  <Route path='/' element={<LoginForm />} />
    <Route element={<ProtectedRoute />}>
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/product/:id' element={<SingleProduct/>}/>
    <Route path="/update-product/:id" element={<UpdateProduct />} />
    <Route path="/create-product" element={<CreateProduct/>}/>

    <Route path="/manage-users" element={<UserDashboard/>}/>
    <Route path="/user/:id" element={<SingleUser/>}/>
    <Route path="/update-user/:id" element={<UpdateUser/>}/>
    <Route path="/create-user" element={<CreateUser/>}/>

    <Route path="/manage-orders" element={<CartDashboard/>}/>
    <Route path="/order/:id" element={<SingleOrder/>}/>
    <Route path="/update-order/:id" element={<UpdateOrder/>}/>
    <Route path={"/create-order"}  element={<CreateCart/>}/>

  </Route>
</Routes>
    </QueryClientProvider>
  </BrowserRouter>
  </ChakraProvider>
  </StrictMode>,
)
