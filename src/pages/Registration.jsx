import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../utils/api'

const Registration = () => {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    lawChamberName: '',
    lawChamberAddress: '',
    gender: '',
    primaryContact: '',
    secondaryContact: '',
    email: '',
    password: '',
    membershipNo: ''
  })

  const handleChange = (e) => {
    try {
      const { name, value } = e.target
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
      
      // Clear any existing error toast for this field
      if (value.trim()) {
        const existingToast = document.querySelector(`[data-error-field="${name}"]`)
        if (existingToast) {
          toast.dismiss(existingToast.id)
        }
      }
    } catch (error) {
      console.error('Error updating form field:', error)
      toast.error('Error updating form field. Please try again.')
    }
  }

  const validateForm = () => {
    // Trim all string values
    const trimmedData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = typeof formData[key] === 'string' ? formData[key].trim() : formData[key]
      return acc
    }, {})

    // Required fields check with individual messages
    const requiredFields = {
      fullName: 'Full Name',
      lawChamberName: 'Law Chamber Name',
      lawChamberAddress: 'Law Chamber Address',
      gender: 'Gender',
      primaryContact: 'Primary Contact',
      email: 'Email',
      password: 'Password',
      membershipNo: 'Membership Number'
    }

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!trimmedData[field]) {
        const toastId = toast.error(`${label} is required`, {
          id: `error-${field}`,
          duration: 4000,
          style: {
            background: '#EF4444',
            color: 'white',
          },
        })
        // Add data attribute for field tracking
        const toastElement = document.getElementById(toastId)
        if (toastElement) {
          toastElement.setAttribute('data-error-field', field)
        }
        // Focus the field with error
        document.getElementById(field)?.focus()
        return false
      }
    }

    // Password validation with specific feedback
    if (trimmedData.password.length < 10 || trimmedData.password.length > 16) {
      const toastId = toast.error('Password must be between 10 and 16 characters', {
        id: 'error-password',
        duration: 4000
      })
      document.getElementById('password')?.focus()
      return false
    }
    
    // Email validation with detailed feedback
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailRegex.test(trimmedData.email)) {
      const toastId = toast.error('Invalid email format. Example: name@domain.com', {
        id: 'error-email',
        duration: 4000
      })
      document.getElementById('email')?.focus()
      return false
    }

    // Phone number validation with format guidance
    const phoneRegex = /^[0-9+\-\s]+$/
    if (!phoneRegex.test(trimmedData.primaryContact)) {
      const toastId = toast.error('Phone number can only contain numbers, +, -, or spaces. Example: +92 300-1234567', {
        id: 'error-primaryContact',
        duration: 5000
      })
      document.getElementById('primaryContact')?.focus()
      return false
    }

    if (trimmedData.secondaryContact && !phoneRegex.test(trimmedData.secondaryContact)) {
      const toastId = toast.error('Secondary phone number format invalid. Example: +92 300-1234567', {
        id: 'error-secondaryContact',
        duration: 5000
      })
      document.getElementById('secondaryContact')?.focus()
      return false
    }

    // Gender validation with clear options
    if (!['male', 'female'].includes(trimmedData.gender.toLowerCase())) {
      const toastId = toast.error('Please select your gender (Male or Female)', {
        id: 'error-gender',
        duration: 4000
      })
      document.getElementById('gender')?.focus()
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
    const toastId = toast.loading('Creating your account...')

    try {
      // Trim all string values before sending
      const trimmedData = Object.keys(formData).reduce((acc, key) => {
        acc[key] = typeof formData[key] === 'string' ? formData[key].trim() : formData[key]
        return acc
      }, {})

      // Add any default values needed
      trimmedData.role = 'user'
      trimmedData.status = 'pending'

      // Update loading toast with submission status
      toast.loading('Submitting your application...', { id: toastId })

      console.log('Sending registration data:', trimmedData)
      const response = await api.post('/auth/register', trimmedData)
      
      console.log('Registration response:', response.data)
      
      // Show success toast first
      toast.success('Your application has been received! ✨', {
        id: toastId,
        duration: 5000,
        icon: '✅'
      })

      // Additional success notification
      setTimeout(() => {
        toast.success('We will notify you once your application is reviewed.', {
          duration: 4000
        })
      }, 1000)

      // Then show modal
      setShowModal(true)
      
      // Finally reset form with visual feedback
      setTimeout(() => {
        setFormData({
          fullName: '',
          lawChamberName: '',
          lawChamberAddress: '',
          gender: '',
          primaryContact: '',
          secondaryContact: '',
          email: '',
          password: '',
          membershipNo: ''
        })
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' })
        
        // Focus first field for new entry
        document.getElementById('fullName')?.focus()
      }, 100)
    } catch (error) {
      console.error('Registration error:', error)
      
      let errorMessage = 'Registration failed. Please try again.'
      let fieldErrors = []
      
      if (error.response) {
        // Log the complete error for debugging
        console.log('Server Error Response:', error.response.data)
        
        // Handle validation errors array from backend
        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
          fieldErrors = error.response.data.errors
          errorMessage = error.response.data.errors[0].msg
          
          // Show individual field errors with slight delay between each
          fieldErrors.forEach((err, index) => {
            setTimeout(() => {
              const toastId = toast.error(`${err.field}: ${err.msg}`, {
                duration: 5000,
                icon: '⚠️'
              })
              // Focus the first error field
              if (index === 0) {
                document.getElementById(err.field)?.focus()
              }
            }, index * 500)
          })
        }
        // Handle specific error messages from the server
        else if (error.response.data.message) {
          errorMessage = error.response.data.message
          
          // Handle specific error cases
          if (error.response.data.field) {
            document.getElementById(error.response.data.field)?.focus()
            toast.error(errorMessage, {
              id: `error-${error.response.data.field}`,
              duration: 5000,
              icon: '⚠️'
            })
          } else {
            toast.error(errorMessage, {
              id: toastId,
              duration: 5000,
              icon: '❌'
            })
          }
        }
      } else if (error.request) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection.'
        console.log('Network Error:', error.request)
        toast.error(errorMessage, {
          id: toastId,
          duration: 5000,
          icon: '🔌'
        })
      } else {
        console.log('Error Details:', error)
        toast.error(errorMessage, {
          id: toastId,
          duration: 5000,
          icon: '❌'
        })
      }
      
      // If no specific field errors were shown, show general error
      if (fieldErrors.length === 0) {
        toast.error(errorMessage, {
          id: toastId,
          duration: 5000,
          icon: '❌'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
          <div className="flex justify-center">
            <img src="/logoicon.png" alt="Logo" className="h-16 w-16" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-semibold text-primary">
            Lawyer Registration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already registered?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary/80">
              Sign in to your account
            </Link>
          </p>
        </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              {/* Law Chamber Name */}
              <div>
                <label htmlFor="lawChamberName" className="block text-sm font-medium text-gray-700">
                  Law Chamber Name
                </label>
                <input
                  id="lawChamberName"
                  name="lawChamberName"
                  type="text"
                  required
                  value={formData.lawChamberName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              {/* Law Chamber Address */}
              <div className="md:col-span-2">
                <label htmlFor="lawChamberAddress" className="block text-sm font-medium text-gray-700">
                  Law Chamber Address
                </label>
                <input
                  id="lawChamberAddress"
                  name="lawChamberAddress"
                  type="text"
                  required
                  value={formData.lawChamberAddress}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Membership Number */}
              <div>
                <label htmlFor="membershipNo" className="block text-sm font-medium text-gray-700">
                  Membership Number
                </label>
                <input
                  id="membershipNo"
                  name="membershipNo"
                  type="text"
                  required
                  value={formData.membershipNo}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              {/* Primary Contact */}
              <div>
                <label htmlFor="primaryContact" className="block text-sm font-medium text-gray-700">
                  Primary Contact
                </label>
                <input
                  id="primaryContact"
                  name="primaryContact"
                  type="tel"
                  required
                  value={formData.primaryContact}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              {/* Secondary Contact */}
              <div>
                <label htmlFor="secondaryContact" className="block text-sm font-medium text-gray-700">
                  Secondary Contact (Optional)
                </label>
                <input
                  id="secondaryContact"
                  name="secondaryContact"
                  type="tel"
                  value={formData.secondaryContact}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

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
                <p className="mt-1 text-xs text-gray-500">
                  Password must be between 10 and 16 characters
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    {/* Success Modal */}
    {showModal && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-sm text-center">
          <h2 className="text-xl font-semibold text-green-600 mb-3">✅ Application Submitted</h2>
          <p className="text-gray-700 mb-4">
            Your application has been received and is pending admin approval.
            You'll be notified once it's approved.
          </p>
          <button 
            onClick={() => setShowModal(false)} 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            OK
          </button>
        </div>
      </div>
    )}
  </>
  )
}

export default Registration