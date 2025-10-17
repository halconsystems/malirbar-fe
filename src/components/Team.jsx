import React from 'react'

const Team = () => {
  return (
    <div className='flex flex-col gap-8 min-h-screen py-8'>
      <div className='text-center px-4'>
        <h1 className='text-2xl md:text-4xl flex flex-col gap-3 text-gray-500'>
          Meet Our Leaders
          <span className='text-[#DC1F27] font-semibold'>Malir Bar Elected Members 2024-2025</span>
        </h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10'>

        <div className='w-full flex flex-col justify-center shadow-xl px-6 h-80'>
          <img src="./president.png" alt="" className='w-26' />
          <h1 className='text-xl font-semibold  mt-4'>Advocate Irshad Ali Shar</h1>
          <p className='text-lg font-semibold '>President</p>
          <p className='text-gray-700 text-sm  mt-2'>A seasoned legal professional known for his
            dedication and active involvement in community
            support and development initiatives.</p>
        </div>

        <div className='w-full flex flex-col justify-center shadow-xl px-6 h-80'>
          <img src="./vice.png" alt="" className='w-26' />
          <h1 className='text-xl font-semibold'>Advocate Akram Qureshi</h1>
          <p className='text-lg font-semibold'>Vice President</p>
          <p className='text-gray-700 text-sm'>An energetic and committed professional
            devoted to promoting unity, discipline and
            progress within the legal community.</p>
        </div>


        <div className='w-full flex flex-col justify-center shadow-xl px-6 h-80'>
          <img src="./general.png" alt="" className='w-26' />
          <h1 className='text-xl font-semibold'>Advocate Ayaz Ali Chandio</h1>
          <p className='text-lg font-semibold'>General Secretary</p>
          <p className='text-gray-700 text-sm'>An energetic and committed professional
            devoted to promoting unity, discipline and
            progress within the legal community.</p>
        </div>

        <div className='w-full flex flex-col justify-center shadow-xl px-6 h-80'>
          <img src="./joint.png" alt="" className='w-26' />
          <h1 className='text-xl font-semibold'>Advocate Asadullah Bhanbharo</h1>
          <p className='text-lg font-semibold'>Joint Secretary</p>
          <p className='text-gray-700 text-sm'>A passionate legal professional dedicated to
            organizational growth and the welfare of the
            legal fraternity.</p>
        </div>

        <div className='w-full flex flex-col justify-center shadow-xl px-6 h-80'>
          <img src="./treasurer.png" alt="" className='w-26' />
          <h1 className='text-xl font-semibold'>Advocate Asma Mohsin</h1>
          <p className='text-lg font-semibold'>treasurer</p>
          <p className='text-gray-700 text-sm'>A diligent professional known for her integrity,
            precision and commitment to transparent
            financial management.</p>
        </div>

        <div className='w-full flex flex-col justify-center shadow-xl px-6 h-80'>
          <img src="./librarian.png" alt="" className='w-26' />
          <h1 className='text-xl font-semibold'>Advocate Nazeer Ahmed Gorar</h1>
          <p className='text-lg font-semibold'>librarian</p>
          <p className='text-gray-700 text-sm'>A devoted professional committed to enhancing
            knowledge resources and promoting digital
            accessibility for the MBA legal community.</p>
        </div>

      </div>


      <div className='text-center'>
        <h1 className='text-5xl py-20 border-t border-gray-200  flex flex-col gap-3  text-[#DC1F27]'>
          In honor of the Devoted Advocates of Malir
          <span className='text-gray-500 font-semibold'>Dedicated & Gifted By:</span>
        </h1>
      </div>


      <div className='flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-30 px-4 md:px-20 py-10'>
        {/* Card */}
        <div className='w-full md:w-lg shadow-lg shadow-[#0A74F340] border-[#0A74F340] flex flex-col px-4 md:px-10 py-5 gap-8 mt-16 md:mt-20'>
          <div className='text-center flex flex-col items-center relative pt-10'>
            <img src="./librarian.png" alt="" className='absolute top-[-70px] md:top-[-90px] w-24 md:w-30' />
            <h1 className='font-bold text-lg md:text-xl'>Nazir Ahmed Gorar</h1>
            <p className='text-sm md:text-md'>Librarian Malir Court 2024-2025</p>
            <p className='text-xs md:text-sm'>Advocate High Court, SIndh</p>
          </div>

          <div className='border-t border-gray-200 pt-6 flex flex-col gap-2'>
            <img src="./quote.png" alt="" className='w-6' />
            <p className='text-sm md:text-base'>When I took over the charge, I felt a dire need for digital presence & I decided to develop a platform for my community. I dedicate this initiative to the growth & betterment of the Malir Bar legal community.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className='w-full md:w-lg shadow-lg shadow-[#0A74F340] border-[#0A74F340] flex flex-col px-4 md:px-10 py-5 gap-8 mt-16 md:mt-20'>
          <div className='text-center flex flex-col items-center relative pt-10'>
            <img src="./ceo.png" alt="" className='absolute top-[-70px] md:top-[-90px] w-24 md:w-30' />
            <h1 className='font-bold text-lg md:text-xl'>Raheel Liaquat Malik</h1>
            <p className='text-sm md:text-md'>Group CEO & President
              IAG Group</p>
            <p className='text-xs md:text-sm'>Advocate High Court, SIndh</p>
          </div>

          <div className='border-t border-gray-200 pt-6 flex flex-col gap-2'>
            <img src="./quote.png" alt="" className='w-6' />
            <p className='text-sm md:text-base'>We are proud to present this gift to the Malir Bar Association in appreciation of your unwavering dedication & services to the legal community. Your dedication continues to strengthen the principles of justice, unity, and excellence.</p>
          </div>
        </div>
      </div>

      <p className='text-center text-xl text-gray-600'>For all administrative queries please contact Malir Bar Superintendent.</p>
    </div>
  )
}

export default Team