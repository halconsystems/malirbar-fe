import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    })
    // You can log the error to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    const { hasError, error } = this.state
    const { fallback, children } = this.props

    if (hasError) {
      if (fallback) {
        return fallback(error)
      }
      return (
        <div className="p-6 bg-red-50 rounded-lg">
          <h2 className="text-lg font-medium text-red-800 mb-2">Something went wrong</h2>
          <p className="text-sm text-red-600 mb-4">
            {error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null, errorInfo: null })
              if (this.props.onReset) {
                this.props.onReset()
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Try again
          </button>
        </div>
      )
    }

    return children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.func,
  onReset: PropTypes.func
}

export default ErrorBoundary