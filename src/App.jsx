import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Lawyers from './pages/Lawyers'
import GeneralBody from './pages/generalBody'
import Court from './pages/Court'
import History from './pages/History'
import Home from './pages/Home'
import Footer from './components/Footer'
import Registration from './pages/Registration'
import Login from './pages/Login'
import { AuthProvider } from './contexts/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              duration: 3000,
              style: {
                background: '#10B981',
                color: 'white',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: '#EF4444',
                color: 'white',
              },
            },
            loading: {
              duration: Infinity,
              style: {
                background: '#3B82F6',
                color: 'white',
              },
            },
          }}
        />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/history' element={<History/>} />
          <Route path='/court' element={<Court/>} />
          <Route path='/general-body' element={<GeneralBody/>} />
          <Route path='/lawyers' element={<Lawyers/>} />
          <Route path='/register' element={<Registration/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
        <Footer/>
      </div>
    </AuthProvider>
  )
}

export default App