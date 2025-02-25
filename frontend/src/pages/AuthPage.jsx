import React, { useEffect, useState } from 'react';

// Components
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

const AuthPage = () => {

    // States
    const [currentPage, setCurrentPage] = useState(true);

    // Handlers
    const handlePageChange = () => {
        setCurrentPage(p => !p);
    }

    useEffect(() => {
        return () => {
            setCurrentPage(true);
        }
    }, []);

    return (
        <React.Fragment>
            <section className='flex flex-col w-full h-full pt-6 overflow-y-auto pb-20 gap-6'>

                {
                    currentPage ? <LoginForm /> : <SignUpForm />
                }

                {
                    currentPage ? (
                        <p className='text-center text-sm text-gray-600'>Don't have an account? <button onClick={handlePageChange} className='text-blue-600 underline'>Sign up</button></p>
                    ) : (
                        <p className='text-center text-sm text-gray-600'>Already have an account? <button onClick={handlePageChange} className='text-blue-600 underline'>Login</button></p>
                    )
                }
                
            </section>
        </React.Fragment>
    );
}

export default AuthPage;
