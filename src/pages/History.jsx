import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const History = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div>

      <div className="min-h-screen bg-[url('/hero.png')] bg-cover mb-10 flex flex-col pt-5">

        {/* Navbar */}

        <div className='bg-white mx-4 lg:mx-10 h-auto py-4 px-6 relative z-50'>
          <div className='flex justify-between items-center'>
            {/* logo */}
            <div className='flex items-center gap-5'>
              <img src='/logoicon.png' className='w-8 h-8 lg:w-10 lg:h-10' />
              <div>
                <h1 className='text-xl lg:text-3xl font-semibold text-[#DC1F27]'>Malir bar Association</h1>
                <p className='text-lg lg:text-xl font-semibold text-gray-800'>Sindh Districts Court</p>
              </div>
            </div>
            {/* Desktop Menu */}
            <div className='hidden lg:flex items-center justify-between '>
              <nav className='flex-1 flex justify-center items-center'>
                <div className='text-md flex items-center gap-8'>
                  <Link to='/' className='font-semibold hover:text-[#DC1F27] transition-colors'>Practice Area</Link>
                  <Link to='/court' className='font-semibold hover:text-[#DC1F27] transition-colors'>Malir Court</Link>
                  <Link to='/history' className='font-semibold hover:text-[#DC1F27] transition-colors'>Bar History</Link>
                  <Link to='/general-body' className='font-semibold hover:text-[#DC1F27] transition-colors'>General Body</Link>
                  <Link to='/lawyers' className='font-semibold hover:text-[#DC1F27] transition-colors'>Lawyers</Link>
                </div>
              </nav>



            </div>

            <div className='hidden lg:flex gap-4 items-center'>
              <Link to='/register'>
                <button className='px-6 py-2 bg-[#DC1F27] text-white font-semibold hover:bg-[#b01820] transition-colors'>Register</button>
              </Link>

              <Link to='/login'>
                <button className='px-6 py-2 bg-[#DC1F27] text-white font-semibold hover:bg-[#b01820] transition-colors'>Login</button>

              </Link>
            </div>
            {/* Hamburger Menu Button */}
            <button
              className='md:hidden text-gray-700 focus:outline-none z-50'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {!isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div className={`md:hidden fixed inset-0 bg-white/30 backdrop-blur-md transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className={`fixed inset-y-0 right-0 w-full bg-white/90 p-6 shadow-lg transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              {/* Close Button */}
              <button
                className='absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors'
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className="w-8 h-8 text-[#DC1F27]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className='h-full flex flex-col justify-center'>
                <div className='flex flex-col items-center  gap-8'>
                  <Link
                    to='/'
                    className='text-2xl font-semibold text-[#DC1F27] hover:text-[#b01820] transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Practice Area
                  </Link>
                  <Link
                    to='/court'
                    className='text-2xl font-semibold text-[#DC1F27] hover:text-[#b01820] transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Malir Court
                  </Link>
                  <Link
                    to='/history'
                    className='text-2xl font-semibold text-[#DC1F27] hover:text-[#b01820] transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Bar History
                  </Link>
                  <Link
                    to='/general-body'
                    className='text-2xl font-semibold text-[#DC1F27] hover:text-[#b01820] transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    General Body
                  </Link>
                  <Link
                    to='/lawyers'
                    className='text-2xl font-semibold text-[#DC1F27] hover:text-[#b01820] transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Lawyers
                  </Link>
                </div>
                <div className='flex flex-col gap-4 mt-8 items-center'>
                  <Link to='/register'><button className='w-48 bg-[#DC1F27] py-3 text-white text-lg font-semibold rounded-md hover:bg-[#b01820] transition-colors'>Register</button>
                  </Link>
                  <Link to='/login'>
                    <button className='w-48 border-2 border-[#DC1F27] py-3 text-[#DC1F27] text-lg font-semibold rounded-md hover:bg-[#DC1F27] hover:text-white transition-colors'>Login</button>

                  </Link>
                  <button className='w-48 border-2 border-[#DC1F27] py-3 text-[#DC1F27] text-lg font-semibold rounded-md hover:bg-[#DC1F27] hover:text-white transition-colors'>Login</button>
                </div>
              </div>
            </div>
          </div>


        </div>


        {/* Content */}
        <div className='w-full min-h-[80vh] flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-center px-4 md:px-10 lg:px-20 text-white py-8 lg:py-0'>
          <div className='w-full lg:w-1/2 flex flex-col gap-4 lg:gap-5 text-center lg:text-left'>
            <span className='text-xl md:text-2xl lg:text-3xl'>District & Session Courts Malir </span>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight'>Where Legacy Leads &
              Justice Prevails</h1>
            <p className='text-xl md:text-2xl'>Law Supremacy</p>
            <button className='w-40 bg-[#DC1F27] py-2.5 rounded hover:bg-[#b01820] transition-colors mx-auto lg:mx-0 text-base md:text-lg'>Read More</button>
          </div>

          <div className='mb-8 lg:mb-0 px-4 md:px-0'>
            <img
              src='/hero-img.png'
              className='w-full max-w-[300px] md:max-w-[400px] lg:max-w-none lg:w-auto'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row w-full min-h-[50vh] mb-10 md:mb-20 px-4 md:px-8'>
        <div className='w-full md:w-1/2 flex flex-col gap-3 p-4 md:p-8'>
          <h1 className='text-3xl md:text-6xl text-gray-600 font-semibold flex flex-col gap-2 text-center md:text-left'>
            Trust Your Future &
            <span className='text-[#DC1F27] font-bold'>Peaceful life</span>
          </h1>
          <p className='text-base md:text-lg py-3 md:py-5 text-center md:text-left'>Lorem ipsum dolor sit amet consectetur. Dui auctor sagittis est et nisl. Cras blandit ultrices adipiscing eget volutpat sed. Lorem diam amet donec enim. Et viverra mauris.</p>
        </div>

        <div className='w-full md:w-1/2 flex flex-col md:flex-row flex-wrap gap-4 md:gap-2 mt-6 md:mt-0'>
          <div className='flex  gap-4 md:gap-2 w-full md:w-auto'>
            {/* box 1 */}
            <div className='flex bg-[#E6F9FF] p-4 md:p-5 relative md:bottom-10  text-center flex-col items-center justify-center gap-2 md:gap-5 hover:scale-105 duration-300 transition-all'>
              <img src='/box1.png' className='w-12 h-12 md:w-16 md:h-16' />
              <h1 className='text-xl md:text-2xl font-semibold'>New Mosque</h1>
              <p className='text-sm md:text-base'>Lorem ipsum dolor sit amet consectetur. Est sapien curabitur.</p>
            </div>

            {/* box 2 */}
            <div className='flex bg-[#FEF2E9] p-4 md:p-5 relative md:bottom-20 text-center flex-col items-center justify-center gap-2 md:gap-3 hover:scale-105 duration-300 transition-all'>
              <img src='/box3.png' className='w-12 h-12 md:w-16 md:h-16' />
              <h1 className='text-xl md:text-2xl font-semibold'>Practice & Support</h1>
              <p className='text-sm md:text-base'>Lorem ipsum dolor sit amet consectetur. Est sapien curabitur.</p>
            </div>
          </div>

          <div className='flex  gap-4 md:gap-2 w-full md:w-auto'>
            {/* box 3 */}
            <div className='flex bg-[#FEF2E9] p-4 md:p-5 relative md:bottom-16 md:mt-6  text-center flex-col items-center justify-center gap-2 md:gap-3 hover:scale-105 duration-300 transition-all'>
              <img src='/box2.png' className='w-12 h-12 md:w-16 md:h-16' />
              <h1 className='text-xl md:text-2xl font-semibold'>New Judicial Complex</h1>
              <p className='text-sm md:text-base'>Lorem ipsum dolor sit amet consectetur. Est sapien curabitur.</p>
            </div>

            {/* box 4 */}
            <div className='flex bg-[#E6F9FF] p-4 md:p-5 relative md:bottom-20  text-center flex-col items-center justify-center gap-2 md:gap-3 hover:scale-105 duration-300 transition-all'>
              <img src='/box4.png' className='w-12 h-12 md:w-16 md:h-16' />
              <h1 className='text-xl md:text-2xl font-semibold'>Registered Lawyers</h1>
              <p className='text-sm md:text-base'>Lorem ipsum dolor sit amet consectetur. Est sapien curabitur.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="flex-1">
          <h3 className="text-gray-600 text-2xl font-semibold">
            Honoring Our Founders
          </h3>
          <h2 className="text-6xl md:text-4xl font-bold mt-2">
            <span className="text-[#DC1F27]">The Legacy Begins here</span>
          </h2>
          <div className='w-full flex'>
            <div className="mt-6  gap-4 w-[55%]">

              <p className="text-gray-700 text-lg leading-relaxed">
                The foundation of the <b>Malir Bar Association</b> was laid under
                the leadership of <b>Mr. Sharfuddin Jamali</b>, the first elected
                President of the Association. Along with a dedicated team of elected
                members, he played a pivotal role in reestablishing the core values
                and traditions that continue to guide the Association to this day.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mt-4 ">
                When Mr. Jamali took over the charge as the founding President during
                1994–1995, he envisioned a platform that would not only represent the
                legal fraternity of Malir Bar but also serve as a beacon of unity,
                professionalism, and justice. His commitment, foresight, and
                unwavering dedication set the cornerstone for a legacy that has
                flourished over the years with empowering generations of lawyers and
                strengthening the legal community of Malir.
              </p>
            </div>
            <img src="/founder.png" className='w-90 mt-4' />
          </div>




          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Today, the Malir Bar Association stands as a testament to and a vibrant
            institution built upon the principles of integrity, service, and
            continuous growth. The journey that began in 1994 remains a source of
            inspiration for all who want to the community.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            It continues to nurture a close knit legal community where
            collaboration, mentorship and mutual respect thrive. Together, the
            members uphold the spirit of justice and solidarity that has defined
            the Association since its inception.

          </p>


        </div>


      </section>
      <div className='flex justify-evenly px-20'>
        <div>
          <img src='/avatar.png' className='w-26 h-26' />
          <h1 className='font-semibold text-xl'>Ghullam Mustafa Lakho</h1>
          <p className='text-gray-800'>Vice President</p>
        </div>

        <div>
          <img src='./avatar.png' className='w-26 h-26' />
          <h1 className='font-semibold text-xl'>Shafafuddin Jamali</h1>
          <p className='text-gray-800'>General Secretary</p>
        </div>

        <div>
          <img src='./avatar.png' className='w-26 h-26' />
          <h1 className='font-semibold text-xl'>Fida Hussain Khuwaja</h1>
          <p className='text-gray-800'>Joint Secretary</p>
        </div>

        <div>
          <img src='./avatar.png' className='w-26 h-26' />
          <h1 className='font-semibold text-xl'>Imtiaz Ali Samoo</h1>
          <p className='text-gray-800'>Library Secretary</p>
        </div>

        <div>
          <img src='./avatar.png' className='w-26 h-26' />
          <h1 className='font-semibold text-xl'>Rehmatullah Moro</h1>
          <p className='text-gray-800'>Treasurer </p>
        </div>

      </div>
      <div className='flex flex-col gap-8 min-h-screen py-20'>
        <div className='text-center'>

          <span className='text-[#DC1F27] font-semibold text-5xl'>Professional Committees   </span>

        </div>

        <div className='grid grid-cols-3 gap-x-2 px-10h-screen px-10 '>

          <div className='w-full flex flex-col gap-3 justify-center shadow-xl px-6 py-10  '>
            <img src="/icon1.png" alt="" className='w-16 h-16 ' />
            <h1 className='text-2xl font-semibold'>Disciplinary Committee  </h1>
            <p className='text-gray-700 text-md '>This Committee is responsible for maintaining
              professional integrity & addressing any
              misconduct among its members.</p>
          </div>

          <div className='w-full flex flex-col gap-3 justify-center shadow-xl px-6   py-10'>
            <img src="/icon2.png" alt="" className='w-16 h-16 ' />
            <h1 className='text-2xl font-semibold'>Financial Committee</h1>
            <p className='text-gray-700 text-md '>This Committee oversees the management, budgeting
              and proper utilization of the Malir Bar Association’s
              financial resources.</p>
          </div>

          <div className='w-full flex flex-col gap-3 justify-center shadow-xl px-6  py-10 '>
            <img src="/icon3.png" alt="" className='w-16 h-16 ' />
            <h1 className='text-2xl font-semibold'>Anti-Toutism Committee</h1>
            <p className='text-gray-700 text-md '>This Committee is dedicated to preventing
              unauthorized practice and ensuring that only
              licensed advocates should practice.</p>
          </div>

          <div className='w-full flex flex-col gap-3 justify-center shadow-xl px-6   py-10'>
            <img src="/icon4.png" alt="" className='w-16 h-16 ' />
            <h1 className='text-2xl font-semibold'>Legal Education Committee</h1>
            <p className='text-gray-700 text-md '>This Committee promotes continuous learning
              by organizing seminars, workshops and training
              sessions to enhance the skills of its members.</p>
          </div>

          <div className='w-full flex flex-col gap-3 justify-center shadow-xl px-6   py-10'>
            <img src="/icon5.png" alt="" className='w-16 h-16 ' />
            <h1 className='text-2xl font-semibold'>Human Rights / Legal Aid Committee</h1>
            <p className='text-gray-700 text-md '>This Committee works to protect fundamental rights
              and provide free legal assistance to underprivileged
              individuals seeking justice.</p>
          </div>

          <div className='w-full flex flex-col gap-3 justify-center shadow-xl px-6   py-10'>
            <img src="/icon6.png" alt="" className='w-16 h-16 ' />
            <h1 className='text-2xl font-semibold'>Conference / Function Committee</h1>
            <p className='text-gray-700 text-md '>This Committee organizes events, seminars
              and official gatherings to foster unity and
              engagement within the MBA community.</p>
          </div>
        </div>





      </div>


      <div className='text-center'>
        <h1 className='text-5xl py-20 border-t border-gray-200  flex flex-col gap-3  text-[#DC1F27]'>
          In honor of the Devoted Advocates of Malir
          <span className='text-gray-500 font-semibold'>Dedicated & Gifted By:</span>
        </h1>
      </div>


      <div className=' flex justify-center items-center gap-30 px-20 py-10'>

        {/* Card */}
        <div className='w-lg shadow-lg shadow-[#0A74F340] border-[#0A74F340] flex flex-col px-10 py-5 gap-8'>

          <div className='text-center flex flex-col items-center relative pt-10'>
            <img src="/librarian.png" alt="" className='absolute top-[-90px] w-30' />
            <h1 className='font-bold text-xl'>Nazir Ahmed Gorar</h1>
            <p className='text-md'>Librarian Malir Court 2024-2025</p>
            <p className='text-sm'>Advocate High Court, SIndh</p>
          </div>

          <div className='border-t border-gray-200 pt-6 flex flex-col gap-2'>
            <img src="/quote.png" alt="" className='w-6' />
            <p>When I took over the charge, I felt a dire need for digital presence & I decided to develop a platform for my community. I dedicate this initiative to the growth & betterment of the Malir Bar legal community.</p>
          </div>
        </div>


        {/* Card 2 */}
        <div className='w-lg shadow-lg shadow-[#0A74F340] border-[#0A74F340] flex flex-col px-10 py-5 gap-8'>

          <div className='text-center flex flex-col items-center relative pt-10'>
            <img src="/ceo.png" alt="" className='absolute top-[-90px] w-30' />
            <h1 className='font-bold text-xl'>Raheel Liaquat Malik</h1>
            <p className='text-md'>Group CEO & President
              IAG Group</p>
            <p className='text-sm'>Advocate High Court, SIndh</p>
          </div>

          <div className='border-t border-gray-200 pt-6 flex flex-col gap-2'>
            <img src="/quote.png" alt="" className='w-6' />
            <p>We are proud to present this gift to the Malir Bar Association in appreciation of your unwavering dedication & services to the legal community. Your dedication continues to strengthen the principles of justice, unity, and excellence.</p>
          </div>
        </div>


      </div>
      <p className='text-center text-xl text-gray-600'>For all administrative queries please contact Malir Bar Superintendent.</p>

    </div>
  )
}

export default History