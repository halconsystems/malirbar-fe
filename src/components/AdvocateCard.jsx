import React from 'react'
import PropTypes from 'prop-types'

const AdvocateCard = ({ advocate, onClick }) => {
  const {
    membershipNo,
    fullName,
    practicingSince,
    lawChamberName,
    email,
    primaryContact,
    barChallan = 'Unpaid',
    profilePic
  } = advocate

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
      <div className="flex items-start gap-4">
        {/* Advocate Image and ID */}
        <div className="flex-shrink-0">
          <button 
            onClick={() => onClick(advocate)}
            className="focus:outline-none group"
          >
            <img
              src={profilePic || '/default-avatar.png'}
              alt={fullName}
              className="w-12 h-12 rounded-full object-cover border border-gray-200 group-hover:border-red-200 transition-colors cursor-pointer"
              onError={(e) => {
                e.target.src = '/default-avatar.png'
              }}
            />
          </button>
          <p className="text-xs text-gray-500 mt-1">ID: {membershipNo}</p>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <button 
                onClick={() => onClick(advocate)}
                className="text-lg font-medium text-gray-900 hover:text-red-600 transition-colors focus:outline-none text-left"
              >
                {fullName}
              </button>
              <p className="text-sm text-gray-600">
                <span className="inline-block">
                  <svg className="w-4 h-4 inline mr-1 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Practicing Since: {practicingSince || 'N/A'}
                </span>
              </p>
            </div>
            <button
              className="text-sm px-3 py-1 rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              📋 Courts
            </button>
          </div>

          {/* Contact Details */}
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Call/WhatsApp</p>
              <p className="text-sm font-medium">{primaryContact}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email ID</p>
              <p className="text-sm font-medium">{email}</p>
            </div>
          </div>

          {/* Law Chamber Details */}
          <div className="mt-2 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Law Chamber Name</p>
              <p className="text-sm font-medium">{lawChamberName}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                barChallan === 'Paid' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {barChallan}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  // Payment function will be added later
                }}
                className="text-xs px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

AdvocateCard.propTypes = {
  advocate: PropTypes.shape({
    membershipNo: PropTypes.string,
    fullName: PropTypes.string,
    practicingSince: PropTypes.string,
    lawChamberName: PropTypes.string,
    email: PropTypes.string,
    primaryContact: PropTypes.string,
    barChallan: PropTypes.string
  }).isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default AdvocateCard