import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import api from '../utils/api'
import AdvocateCard from './AdvocateCard'
// Removed AdvocateProfile import as we're using AdvocateProfileSidebar instead
import ErrorBoundary from './ErrorBoundary'

const ADVOCATES_PER_PAGE = 5
const ALPHABET = [...Array(26)].map((_, i) => String.fromCharCode(65 + i))

const AdvocatesList = ({ onAdvocateClick }) => {
  // State management
  const [advocates, setAdvocates] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('active')
  const [selectedLetter, setSelectedLetter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch advocates data
  useEffect(() => {
    fetchAdvocates()
  }, [])

  const fetchAdvocates = async () => {
    try {
      setLoading(true)
      const response = await api.get('/user/get-all')

      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || 'Failed to fetch advocates')
      }

      const allAdvocates = response.data.data || []
      
      setAdvocates(allAdvocates)
      
      if (allAdvocates.length > 0) {
        toast.success('Advocates loaded successfully')
      } else {
        toast.info('No advocates found')
      }

    } catch (error) {
      console.error('Error fetching advocates:', error)
      
      let errorMessage = 'Failed to load advocates'
      
      if (!error.response) {
        // Network error
        errorMessage = 'Unable to connect to server. Please check your internet connection.'
      } else {
        switch (error.response.status) {
          case 401:
            errorMessage = 'Please log in to view advocates'
            // Optionally redirect to login
            break
          case 403:
            errorMessage = 'You do not have permission to view advocates'
            break
          case 404:
            errorMessage = 'The advocates list is not available'
            break
          case 500:
            errorMessage = 'Server error. Please try again later'
            break
          default:
            errorMessage = error.response.data?.message || 'Error loading advocates'
        }
      }
      
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Filter advocates based on filters and search
  const getFilteredAdvocates = () => {
    let filtered = [...advocates]

    // Always filter for approved status
    filtered = filtered.filter(adv => adv.status === 'approved')

    // Alphabet filter
    if (selectedLetter !== 'All') {
      filtered = filtered.filter(adv => 
        adv.fullName?.charAt(0).toUpperCase() === selectedLetter
      )
    }

    return filtered.sort((a, b) => a.fullName.localeCompare(b.fullName))
  }

  // Pagination logic
  const filteredAdvocates = getFilteredAdvocates()
  const totalPages = Math.ceil(filteredAdvocates.length / ADVOCATES_PER_PAGE)
  const paginatedAdvocates = filteredAdvocates.slice(
    (currentPage - 1) * ADVOCATES_PER_PAGE,
    currentPage * ADVOCATES_PER_PAGE
  )

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#DC1F27] border-t-transparent"></div>
      </div>
    )
  }

  const handleRetry = () => {
    setCurrentPage(1)
    setSelectedLetter('All')
    setActiveTab('active')
    fetchAdvocates()
  }

  return (
    <ErrorBoundary
      onReset={handleRetry}
      fallback={(error) => (
        <div className="p-6 bg-red-50 rounded-lg">
          <h2 className="text-lg font-medium text-red-800 mb-2">Unable to load advocates</h2>
          <p className="text-sm text-red-600 mb-4">
            {error?.message || 'An unexpected error occurred while loading the advocates list.'}
          </p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Retry
          </button>
        </div>
      )}
    >
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'active'
              ? 'bg-[#DC1F27] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => {
            setActiveTab('active')
            setCurrentPage(1)
          }}
        >
          Active
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'inactive'
              ? 'bg-[#DC1F27] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => {
            setActiveTab('inactive')
            setCurrentPage(1)
          }}
        >
          In-Active
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-[#DC1F27] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => {
            setActiveTab('all')
            setCurrentPage(1)
          }}
        >
          List All
        </button>
      </div>

      {/* Alphabet filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            selectedLetter === 'All'
              ? 'bg-[#DC1F27] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => {
            setSelectedLetter('All')
            setCurrentPage(1)
          }}
        >
          All
        </button>
        {ALPHABET.map(letter => (
          <button
            key={letter}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedLetter === letter
                ? 'bg-[#DC1F27] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => {
              setSelectedLetter(letter)
              setCurrentPage(1)
            }}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="w-full">
        {/* Advocates List */}
        <div className="space-y-4">
          {/* Top Bar with Profile Icon and Filters */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Filter Text */}
              <span className="text-sm text-gray-500">Filter:</span>
            </div>
            {/* Filter Icons */}
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h18M3 12h18M3 20h18" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && paginatedAdvocates.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">
                No approved advocates found
              </p>
            </div>
          ) : (
            <>
              {/* Advocates List */}
              <div className="space-y-4">
                {paginatedAdvocates.map(advocate => (
                  <AdvocateCard
                    key={advocate._id}
                    advocate={advocate}
                    onClick={() => onAdvocateClick(advocate)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
    </ErrorBoundary>
  )
}

export default AdvocatesList