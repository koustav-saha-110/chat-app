import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

// Store
import { useAuthStore } from '../store/useAuthStore';

const LoginForm = () => {

    // States
    const { loginLoading, login } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handlers
    const submitHandler = (e) => {
        e.preventDefault();
        login({ email: email, password: password });
    }

    useEffect(() => {
        return () => {
            setEmail('');
            setPassword('');
        }
    }, []);

    return (
        <React.Fragment>
            <div className='flex flex-col items-center text-center'>
                <h1 className='text-center text-2xl'>Login</h1>
                <p className='text-center text-sm text-gray-600 w-[80%]'>Please login to continue. Provide the informations below to verify youreself</p>
            </div>

            {/* LOGIN FORM */}
            <form onSubmit={submitHandler} className='flex flex-col px-6 gap-2'>

                {/* EMAIL */}
                <div className='flex flex-col gap-1'>
                    <label htmlFor='email' className='text-sm font-medium text-gray-600'>Email</label>
                    <input value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} type='email' name='email' id='email' placeholder='Enter your email' className='w-full border rounded-md p-2' required />
                </div>

                {/* PASSWORD */}
                <div className='flex flex-col gap-1'>
                    <label htmlFor='password' className='text-sm font-medium text-gray-600'>Password</label>
                    <input value={password} onChange={(e) => {
                        setPassword(e.target.value);
                    }} type='password' name='password' id='password' placeholder='Enter your password' className='w-full border rounded-md p-2' required />
                </div>

                <div className='flex flex-col gap-1'>
                    <button disabled={loginLoading} type='submit' className='w-full bg-blue-600 flex items-center justify-center text-white font-medium py-2 rounded-md text-center'>
                        {
                            loginLoading ? <Loader2 className='animate-spin' /> : "Login"
                        }
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
}

export default LoginForm;
