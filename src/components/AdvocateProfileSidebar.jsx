import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'

const AdvocateProfileSidebar = ({ advocate, isOpen, onClose }) => {
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!advocate) return null

  const {
    profilePic,
    fullName,
    lawChamberName,
    lawChamberAddress,
    primaryContact,
    secondaryContact,
    email,
    practicingSince
  } = advocate

  // Calculate license valid till date (1 year from practicing since)
  const licenseValidTill = practicingSince
    ? new Date(new Date(practicingSince).setFullYear(new Date(practicingSince).getFullYear() + 1)).toLocaleDateString()
    : 'N/A'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 100 }}
            className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white shadow-xl z-50 overflow-y-auto"
          >
            {/* Header with close button */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src={profilePic || '/default-avatar.png'}
                  alt={fullName}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = '/default-avatar.png'
                  }}
                />
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{fullName || 'N/A'}</h2>
                  <p className="text-sm text-gray-500">Province</p>
                  <p className="text-sm text-gray-500">City</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                aria-label="Close profile"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-4 space-y-4">
              {/* Main Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Law Chamber Name</h3>
                  <p className="text-gray-700">{lawChamberName || 'N/A'}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Office Address</h3>
                  <p className="text-gray-700">Room No. 110df Court {lawChamberAddress || 'N/A'}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Mobile Number / WhatsApp</h3>
                  <a 
                    href={`tel:${primaryContact}`}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    +{primaryContact || 'N/A'}
                  </a>
                </div>

                {secondaryContact && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Secondary Number / WhatsApp</h3>
                    <a 
                      href={`tel:${secondaryContact}`}
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      +{secondaryContact}
                    </a>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Email</h3>
                  <a 
                    href={`mailto:${email}`}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {email || 'N/A'}
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">License Activation Date</h3>
                  <p className="text-gray-700">{practicingSince || 'N/A'}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">License Valid till</h3>
                  <p className="text-gray-700">{licenseValidTill}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

AdvocateProfileSidebar.propTypes = {
  advocate: PropTypes.shape({
    profilePic: PropTypes.string,
    fullName: PropTypes.string,
    lawChamberName: PropTypes.string,
    lawChamberAddress: PropTypes.string,
    primaryContact: PropTypes.string,
    secondaryContact: PropTypes.string,
    email: PropTypes.string,
    practicingSince: PropTypes.string
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default AdvocateProfileSidebar