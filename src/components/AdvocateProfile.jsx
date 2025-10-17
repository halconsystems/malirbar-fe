import React from 'react'
import PropTypes from 'prop-types'


const AdvocateProfile = ({ advocate, onClose }) => {
  if (!advocate) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Please select an advocate to view their profile</p>
      </div>
    )
  }

  const {
    profilePic,
    fullName,
    lawChamberName,
    lawChamberAddress,
    primaryContact,
    secondaryContact,
    email,
    practicingSince,
  } = advocate

  // Sample date calculation for license validity (1 year from practicing since)
  const licenseValidTill = practicingSince 
    ? new Date(new Date(practicingSince).setFullYear(new Date(practicingSince).getFullYear() + 1)).toLocaleDateString()
    : 'N/A'

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Advocate Profile</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close profile"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center mb-6">
        <img
          src={profilePic || '/default-avatar.png'}
          alt={fullName}
          className="w-32 h-32 rounded-full object-cover border-4 border-red-100"
          onError={(e) => {
            e.target.src = '/default-avatar.png'
          }}
        />
        <h3 className="mt-4 text-xl font-semibold text-gray-800">{fullName || 'N/A'}</h3>
        <p className="text-sm text-gray-500">Province / City</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Law Chamber</label>
          <p className="text-gray-600">{lawChamberName || 'N/A'}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Office Address</label>
          <p className="text-gray-600">{lawChamberAddress || 'N/A'}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Contact Numbers</label>
          <p className="text-gray-600">Primary: {primaryContact || 'N/A'}</p>
          {secondaryContact && (
            <p className="text-gray-600">Secondary: {secondaryContact}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <p className="text-gray-600">{email || 'N/A'}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">License Details</label>
          <p className="text-gray-600">Activated: {practicingSince || 'N/A'}</p>
          <p className="text-gray-600">Valid Till: {licenseValidTill}</p>
        </div>
      </div>
    </div>
  )
}

AdvocateProfile.propTypes = {
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
  onClose: PropTypes.func.isRequired
}

export default AdvocateProfile