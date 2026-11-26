import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage'
import LoginPage from './pages/loginPage'
import HomePage from './pages/homePage'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/registerPage'
import ProductsPage from './pages/client/productPage'
import ProductOverview from './pages/client/productOverview'
import CartPage from './pages/client/cart'
import ChechoutPage from './pages/client/checkout'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
    
        <Toaster position='top-right' />
        <Routes path= "/*">
          <Route path="/" element={<HomePage/>}/>
          <Route path="/products" element={<ProductsPage/>}/>
          <Route path="/overview/:id" element={<ProductOverview/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/checkout" element={<ChechoutPage/>}/>
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/*" element={<h1>404 Not Found</h1>}/> {/*Any other links*/}
        </Routes>

      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App

//start from 18