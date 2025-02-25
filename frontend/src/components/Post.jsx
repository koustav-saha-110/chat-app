import React, { useState } from 'react';
import { Heart, Trash } from 'lucide-react';

// Store
import { useAuthStore } from "../store/useAuthStore";
import { usePostStore } from "../store/usePostStore";
import { useMessageStore } from "../store/useMessageStore";

const Post = ({ mediaUrl, mediaType, caption, author, _id, time, likes }) => {

    // States
    const { likePost, deletePost } = usePostStore();
    const { authUser } = useAuthStore();
    const { onlineUsers } = useMessageStore();
    const [liked, setLiked] = useState(likes.includes(authUser._id));
    const [likeCount, setLikeCount] = useState(likes.length);

    // Handlers
    const handleLike = () => {
        setLiked(p => !p);
        if (liked) setLikeCount(p => p - 1);
        else setLikeCount(p => p + 1);

        likePost(_id);
    }

    return (
        <React.Fragment>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center px-4 gap-2'>
                    <div className='w-12 h-12 rounded-full border shrink-0 relative'>
                        <img src={author.profilePic || "/avatar.png"} alt="Profile Image" className='w-full object-cover object-center rounded-full h-full' />
                        {
                            onlineUsers.includes(author._id) && (
                                <div className='absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-white border-2' />
                            )
                        }
                    </div>
                    <div className='flex flex-col w-full'>
                        <h1 className='text-sm font-medium'>{author.name}</h1>
                        <span className='text-gray-500 text-xs'>Posted at {time}</span>
                    </div>
                </div>
                <div className={`${mediaType == 'image' ? 'h-96 w-full' : 'h-64 w-full'} bg-gray-200 border border-gray-300 relative`}>
                    {
                        mediaType == 'image' ? (
                            <img src={mediaUrl} alt="Post Image" className='w-full h-full object-cover object-center' />
                        ) : (
                            <video
                                src={mediaUrl}
                                loop
                                autoPlay
                                muted
                                preload='auto'
                                className='w-full h-full object-cover object-center'
                            />
                        )
                    }
                    {
                        liked ? (
                            <div className='absolute bottom-3 left-3 flex items-center z-20 gap-1'>
                                <Heart onClick={handleLike} className='w-5 h-5 bg-transparent text-red-500' />
                                <p className='text-sm bg-transparent text-red-500'>{likeCount}</p>
                            </div>
                        ) : <div className='absolute bottom-3 left-3 flex items-center z-20 gap-1'>
                            <Heart onClick={handleLike} className='w-5 h-5 bg-transparent text-white' />
                            <p className='text-sm bg-transparent text-white'>{likeCount}</p>
                        </div>
                    }
                    {
                        author._id === authUser._id && (
                            <div className='absolute bottom-3 right-3 flex items-center z-20 gap-1'>
                                <Trash onClick={() => {
                                    deletePost(_id);
                                }} className='w-5 h-5 bg-transparent text-red-500' />
                            </div>
                        )
                    }
                </div>
                <div className='px-4 leading-none'>
                    <span className='text-sm font-medium tracking-tight'>{author.name} <span className='font-normal'>{caption}</span></span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Post;
