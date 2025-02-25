import React, { useEffect, useState } from 'react';
import { ChevronLeft, Loader2, LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Store
import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {

    // States
    const navigate = useNavigate();
    const { authUser, logout, update, loading } = useAuthStore();
    const [profilePic, setProfilePic] = useState(authUser?.profilePic);
    const [name, setName] = useState(authUser?.name);

    // Handlers
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

    function updateProfile(e) {
        e.preventDefault();

        if (profilePic?.startsWith('data:image/')) {
            update({
                name: name,
                profilePic: profilePic
            });
        } else {
            update({
                name: name
            });
        }
    }

    function handleBack() {
        navigate(-1);
    }

    useEffect(() => {
        return () => {
            setProfilePic(null);
            setName('');
        }
    }, []);

    return (
        <React.Fragment>
            <div className='flex flex-col gap-2 h-full pt-2'>

                {/* HEADER SECTION */}
                <div className='flex px-4 py-2 items-center justify-between'>
                    <ChevronLeft onClick={handleBack} className='w-5 h-5 cursor-pointer' />
                    <LogOutIcon onClick={logout} className='w-5 h-5 cursor-pointer' />
                </div>

                <hr />

                {/* PROFILE SECTION */}
                <div className='flex flex-col items-center justify-center gap-1'>
                    <div className='relative rounded-full overflow-hidden w-52 h-52 border border-gray-300'>
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
                <h1 className='text-center text-2xl font-medium'>{name}</h1>

                {/* INPUT FORM SECTION */}
                <form onSubmit={updateProfile} className='flex px-4 flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='name' className='text-sm font-medium text-gray-600'>Name</label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} name='name' id='name' placeholder='Enter your name' className='w-full border text-md rounded-md p-2' required />
                    </div>
                    <div className='flex justify-end items-center gap-1'>
                        <button type='submit' className='flex items-center justify-center self-end border text-sm border-gray-300 px-5 py-1 rounded-full bg-white text-center'>
                            {loading ? <Loader2 className='animate-spin' /> : "Update Profile"}
                        </button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}

export default ProfilePage;
