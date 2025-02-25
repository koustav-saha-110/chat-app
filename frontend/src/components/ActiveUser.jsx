import React from 'react';
import { Link } from 'react-router-dom';
import image from "/avatar.png";

const ActiveUser = ({ profilePic, _id }) => {
    return (
        <React.Fragment>
            <Link to={`/chat/${_id}`} className='flex flex-col items-center shrink-0'>
                <div className='relative w-12 h-12 border rounded-full'>
                    <img
                        src={profilePic || image}
                        alt="User Avatar"
                        className='w-full h-full rounded-full object-cover object-center'
                    />
                    <div className='absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white' />
                </div>
            </Link>
        </React.Fragment>
    );
}

export default ActiveUser;
