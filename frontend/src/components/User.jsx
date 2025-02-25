import React from 'react';
import image from "/avatar.png";
import { Link } from 'react-router-dom';

// Stores
import { useMessageStore } from '../store/useMessageStore';

const User = ({ profilePic, _id, name }) => {

    // States
    const { onlineUsers } = useMessageStore();

    return (
        <React.Fragment>
            <Link to={`/chat/${_id}`} className='flex flex-col gap-1'>
                <div className='flex px-4 items-center flex-shrink-0 gap-2'>
                    <div className='w-[55px] h-[55px] rounded-full border shrink-0 relative'>
                        <img src={profilePic || image} alt="Profile Image" className='w-full object-cover object-center rounded-full h-full' />
                        {
                            onlineUsers.includes(_id) && (
                                <div className='absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-white border-2' />
                            )
                        }
                    </div>
                    <div className='flex flex-col w-full'>
                        <h1 className='text-sm font-medium'>{name}</h1>
                        <span className='text-gray-500 text-xs'>click to message</span>
                    </div>
                </div>
                <hr />
            </Link>
        </React.Fragment>
    );
}

export default User;
