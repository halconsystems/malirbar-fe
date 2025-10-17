import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../utils/api'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [statusModal, setStatusModal] = useState({
    show: false,
    type: ''
  })
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error('Please fill in all fields')
      return false
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    const toastId = toast.loading('Signing in...')

    try {
      const response = await api.post('/auth/login', formData)
      console.log('Login response:', response.data)
      
      const { user, accessToken, refreshToken } = response.data
      
      // Check user status first
      if (user.status === 'pending') {
        toast.dismiss(toastId)
        setStatusModal({ type: 'pending', show: true })
        return
      }

      if (user.status === 'rejected') {
        toast.dismiss(toastId)
        setStatusModal({ type: 'rejected', show: true })
        return
      }

      // Handle approved users by role
      if (user.role === 'admin') {
        console.log('Admin user detected, redirecting to admin dashboard')
        toast.success('Welcome back, Admin! Redirecting...', { id: toastId })
        window.location.href = `http://localhost:3002/auth?token=${accessToken}`
      } else {
        // Regular user flow
        console.log('Regular user login, proceeding to user dashboard')
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('user', JSON.stringify(user))
        
        toast.success(`Welcome back, ${user.fullName}!`, { id: toastId })
        navigate('/')
      }
    } catch (error) {
      toast.error(
        error.response?.status === 401 
          ? 'Invalid email or password'
          : error.response?.data?.message || 'Login failed. Please try again.',
        { id: toastId }
      )

      // Clear any existing tokens on login failure
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')

      // Log error for debugging
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src="/logoicon.png" alt="Logo" className="h-16 w-16" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-semibold text-primary">
          Login to Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Not registered yet?{' '}
          <Link to="/register" className="font-medium text-primary hover:text-primary/80">
            Create an account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Status Modal */}
      {statusModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm">
            {statusModal.type === 'pending' && (
              <>
                <h2 className="text-xl font-semibold text-yellow-600 mb-3">⚠️ Application Under Review</h2>
                <p className="text-gray-700 mb-4">Your account is still pending admin approval.</p>
              </>
            )}
            {statusModal.type === 'rejected' && (
              <>
                <h2 className="text-xl font-semibold text-red-600 mb-3">❌ Application Rejected</h2>
                <p className="text-gray-700 mb-4">Your application was not approved. Please contact support.</p>
              </>
            )}
            <button
              onClick={() => setStatusModal({ show: false, type: '' })}
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login