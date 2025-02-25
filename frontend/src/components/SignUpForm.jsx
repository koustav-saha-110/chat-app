import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Camera, Loader2 } from 'lucide-react';

// Store
import { useAuthStore } from '../store/useAuthStore';

const SignUpForm = () => {

    // States
    const { signupLoading, signup } = useAuthStore();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Handlers
    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Password does not match");
            return;
        }

        if (!profilePic) {
            toast.error("Profile picture is required");
            return;
        }

        const data = {
            name,
            age,
            email,
            profilePic,
            password
        };

        signup(data);
    }

    function selectProfilePicture(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader?.result);
            }

            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        return () => {
            setName('');
            setAge('');
            setEmail('');
            setProfilePic(null);
            setPassword('');
            setConfirmPassword('');
        }
    }, []);

    return (
        <React.Fragment>

            <div className='flex flex-col items-center text-center'>
                <h1 className='text-center text-2xl'>Your Identity</h1>
                <p className='text-center text-sm text-gray-600 w-[80%]'>Please login to continue. Provide the informations below to verify youreself</p>
            </div>

            <form onSubmit={submitHandler} className='flex flex-col px-6 gap-2'>

                {/* NAME */}
                <div className='flex flex-col gap-1'>
                    <label htmlFor='name' className='text-sm font-medium text-gray-600'>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} name='name' id='name' placeholder='Enter your name' className='w-full border rounded-md p-2' required />
                </div>

                {/* AGE */}
                <div className='flex flex-col gap-1'>
                    <label htmlFor='age' className='text-sm font-medium text-gray-600'>Age</label>
                    <input value={age} onChange={(e) => setAge(e.target.value)} type='number' name='age' id='age' placeholder='Enter your age' className='w-full border rounded-md p-2' required min={18} max={100} />
                </div>

                {/* EMAIL */}
                <div className='flex flex-col gap-1'>
                    <label htmlFor='email' className='text-sm font-medium text-gray-600'>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' name='email' id='email' placeholder='Enter your email' className='w-full border rounded-md p-2' required />
                </div>

                {/* PROFILE PICTURE */}
                <div className='flex flex-col gap-1'>
                    <label htmlFor='profilePic' className='text-sm font-medium text-gray-600'>Profile Picture</label>
                    <div className='relative rounded-full overflow-hidden w-36 h-36 border border-gray-300'>
                        {profilePic ? (
                            <img src={profilePic} alt="Profile Picture" className='w-full h-full object-cover rounded-full p-1' />
                        ) : (
                            <div className='flex items-center justify-center w-full h-full bg-gray-100 rounded-full'>
                                <p className='text-gray-600 text-center flex flex-col items-center'>
                                    <Camera className='w-5 h-5' />
                                    <span className='font-medium'>Upload</span>
                                </p>
                            </div>
                        )}
                        <input onChange={selectProfilePicture} type='file' name='profilePic' id='profilePic' className='absolute inset-0 opacity-0 cursor-pointer' />
                    </div>
                </div>

                {/* PASSWORD */}
                <div className='flex flex-col gap-1'>
                    <label htmlFor='password' className='text-sm font-medium text-gray-600'>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' name='password' id='password' placeholder='Enter your password' className='w-full border rounded-md p-2' required />
                </div>

                {/* CONFIRM PASSWORD */}
                <div className='flex flex-col gap-1'>
                    <label htmlFor='confirmPassword' className='text-sm font-medium text-gray-600'>Confirm Password</label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' name='confirmPassword' id='confirmPassword' placeholder='Enter your password again' className='w-full border rounded-md p-2' required />
                </div>

                <div className='flex flex-col gap-1'>
                    <button disabled={signupLoading} type='submit' className='w-full bg-blue-600 text-white flex items-center justify-center text-center font-medium py-2 rounded-md'>
                        {
                            signupLoading ? <Loader2 className='animate-spin' /> : "Sign Up"
                        }
                    </button>
                </div>
            </form>

        </React.Fragment>
    );
}

export default SignUpForm;
