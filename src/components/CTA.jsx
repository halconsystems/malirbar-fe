import React from 'react'

const CTA = () => {
  return (
    <div className='min-h-screen flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-center px-4 md:px-10 lg:px-20 py-10 lg:py-0 gap-8 lg:gap-0'>
        <div className='w-full lg:w-[55%] px-4 md:px-0'>
            <img 
                src="/cta.png" 
                alt="cta" 
                className='w-full max-w-2xl mx-auto lg:max-w-none'
            />
        </div>

        <div className='w-full lg:w-[45%] flex flex-col gap-6 lg:gap-10 justify-center text-center lg:text-left px-4 lg:px-0'>
            <h1 className='text-3xl md:text-5xl lg:text-6xl flex flex-col gap-2 text-gray-500'>
                Connect With Best
                <span className='text-[#DC1F27] font-semibold'>Legal Advisor</span>
            </h1>
            <p className='text-base md:text-lg lg:text-xl text-gray-600'>
                Connect with our most trusted legal advisor for clear, reliable, and results-driven support. Your case deserves nothing less than the best.
            </p>
            <button className='w-40 py-2.5 bg-[#dc1f27] text-white font-semibold text-base lg:text-lg rounded-xl hover:bg-[#b01820] transition-colors mx-auto lg:mx-0'>
                Lawyers
            </button>
        </div>
    </div>
  )
}

export default CTA