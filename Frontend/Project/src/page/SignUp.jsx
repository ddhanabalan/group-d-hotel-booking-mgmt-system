import React from 'react'
import { Link } from 'react-router-dom'
import WrapperContainer from '../components/WrapperContainer'

function SignUp() {
    return (
        <>
            <div className="bg-[#a1936c]">
                <WrapperContainer>
                    <div id="showcase-Section" className="flex flex-wrap flex-col md:flex-row justify-between items-center pt-8">
                        <div className="container">
                            <div className="text-center h-[70vh]">
                                <h1 className="mt-8 uppercase underline text-3xl font-bold tracking-tight md:text-4xl lg:text-4xl">Sign Up</h1>
                                <form action="">
                                    <div classname="mt-4">
                                        
                                        <input type="text" placeholder='Username' />
                                        </div>
                                    <div className='mt-4'>
                                    
                                        <input type="password" placeholder='Password' />
                                         </div>
                                    <div className='mt-4'>
                                    
                                        <input type="password" placeholder='Re-Enter Password' />
                                        </div>
                                    <div className='mt-4'>
                                    
                                        <input type="email" placeholder='Email' />
                                        </div>
                                </form>
                                <div className="terms">
                                    <input type="checkbox" id="checkbox" />
                                    <label htmlFor="checkbox">I agree to the Terms & Condition</label>
                                </div>
                                <div className='mt-4'>
                                    <button className="px-4 p-3 bg-[#2015bf] uppercase text-white font-normal rounded">
                                        Sign up
                                    </button>
                                </div>
                                <div className="mt-4">
                                    Already have an account? 
                                    <div className='underline'>
                                    <Link to='/Login'>Login</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </WrapperContainer>
            </div>
        </>
    )
}

export default SignUp