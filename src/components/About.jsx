import React from 'react'

const About = () => {
    return (
        <div className='flex flex-col md:flex-row min-h-screen px-4 md:px-20 items-center justify-center gap-8 md:gap-20 lg:gap-40 border-t border-gray-200 py-8 md:py-0'>
            <div className='w-full md:w-1/3'>
                <h1 className='my-5 text-2xl md:text-4xl font-semibold text-[#DC1F27] text-center'>Malir Bar Association</h1>
                <img src='./about.png' className='relative w-full max-w-md mx-auto' />
            </div>
            <div className='w-full md:w-1/2 text-md flex flex-col gap-4 md:gap-5 px-4 md:px-0'>
                <p className='text-sm md:text-base'>The Malir Bar Association stands as a pillar of justice, integrity and professional
                    excellence. We firmly believe in the supremacy of the rule of law and are committed to upholding the principles of fairness, equality and accountability within our judicial system.</p>
                <p className='text-sm md:text-base'>Our association represents a community of dedicated advocates who work
                    tirelessly to ensure that every individual who comes to the Malir Courts in search
                    of justice is treated with respect, dignity and impartiality. We take pride in being the
                    voice of the people, protecting their rights, guiding them through legal complexities
                    and ensuring that justice is not just a privilege for a few, but a right for all.</p>
                <p className='text-sm md:text-base'>With a legacy built on trust, service, and commitment, the Malir Bar Association
                    continues to empower its members, strengthen legal education and support every
                    effort that brings our society closer to a just and equitable system. Together, we
                    uphold the noble mission of the legal profession to serve justice.</p>

                <button className='px-5 py-2.5 bg-[#dc1f27] w-40 rounded-xl text-white font-semibold text-sm md:text-md mx-auto md:mx-0 hover:bg-[#b01820] transition-colors'>Read More</button>
            </div>
        </div>
    )
}

export default About