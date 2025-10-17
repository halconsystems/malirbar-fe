import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='flex flex-col justify-between mt-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-8 lg:px-20'>
        <div className='flex flex-col gap-5'>
          <div className='flex items-center gap-3 md:gap-5 justify-center md:justify-start'>
            <img src='./logoicon.png' className='w-14 h-14 md:w-18 md:h-18' />
            <div>
              <h1 className='text-2xl md:text-4xl font-semibold text-[#DC1F27]'>Malir bar</h1>
              <p className='text-lg md:text-xl text-gray-800'>Sindh Districts Court</p>
            </div>
          </div>
          {/* social  */}
          <div className='flex justify-center md:justify-evenly gap-4'>
            <img src='./fb.png' className='w-4 h-6 cursor-pointer hover:opacity-80 transition-opacity' />
            <img src='./twiter.png' className='w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity' />
            <img src='./insta.png' className='w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity' />
            <img src='./linkedin.png' className='w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity' />
          </div>
        </div>

        <div className='flex flex-col gap-2 text-sm items-center md:items-start'>
          <h1 className='font-semibold text-lg mb-2'>Home</h1>
          <Link to='/' className='hover:text-[#DC1F27] transition-colors'>Practice Area</Link>
          <Link to='/' className='hover:text-[#DC1F27] transition-colors'>Malir Court</Link>
          <Link to='/' className='hover:text-[#DC1F27] transition-colors'>Malir Bar History</Link>
          <Link to='/' className='hover:text-[#DC1F27] transition-colors'>General Body</Link>
          <Link to='/' className='hover:text-[#DC1F27] transition-colors'>Malir Court Lawyers</Link>
          <Link to='/' className='hover:text-[#DC1F27] transition-colors'>Login</Link>
        </div>

        <div className='flex flex-col gap-2 text-sm items-center md:items-start'>
          <h1 className='font-semibold text-lg mb-2'>Quick Links</h1>
          <Link to='/' className='hover:text-[#DC1F27] transition-colors text-center md:text-left'>Sindh High Court</Link>
          <Link to='/' className='hover:text-[#DC1F27] transition-colors text-center md:text-left'>Sindh High Court Bar Association</Link>
          <Link to='/' className='hover:text-[#DC1F27] transition-colors text-center md:text-left'>Karachi Bar Association</Link>
          <Link to='/' className='hover:text-[#DC1F27] transition-colors text-center md:text-left'>Advocate General Of Sindh</Link>
        </div>

        <div className='flex flex-col gap-4 items-center md:items-start'>
          <h1 className='text-2xl md:text-3xl font-semibold'>Subscribe</h1>
          <p className='text-center md:text-left md:w-2/3'>Please enter your valid email id to subscribe;</p>
          <div className='flex flex-col w-full md:w-auto'>
            <input 
              type="email" 
              placeholder='Enter your email' 
              className='border border-gray-400 rounded-md px-4 py-2 w-full md:w-64 focus:outline-none focus:border-[#DC1F27]' 
            />
            <button className='w-full md:w-64 mt-2 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors'>
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <p className='py-3 text-center mt-8 text-sm md:text-md border-t border-gray-200 mx-4'> 
        All Rights Reserved @Malir Bar Association 2025
      </p>
    </div>
  )
}

export default Footer