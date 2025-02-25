import React, { useEffect, useRef, useState } from 'react';
import image from "/avatar.png";
import { ChevronLeft, SendHorizonal } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

// Store
import { useUserStore } from '../store/useUserStore';
import { useAuthStore } from '../store/useAuthStore';
import { useMessageStore } from '../store/useMessageStore';

// Components
import { CheckAuthLoader } from '../App';
import Chat from '../components/Chat';

const ChatPage = () => {

    // States
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const { users, fetchUsers } = useUserStore();
    const { authUser } = useAuthStore();
    const { messages, sendMessage, getMessages, subscribeToNewMessages, unsubscribeToNewMessages, onlineUsers, subscribeToOnlineUsers, unsubscribeToOnlineUsers } = useMessageStore();
    const navigate = useNavigate();
    const input = useRef(null);

    // Found User
    const user = users.find(user => user._id === id);

    // Handlers
    const handleBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        if (authUser) {
            fetchUsers();
        }
    }, []);

    useEffect(() => {
        subscribeToOnlineUsers();

        return () => {
            unsubscribeToOnlineUsers();
        }
    }, [subscribeToOnlineUsers, unsubscribeToOnlineUsers, user, authUser]);

    useEffect(() => {
        if (user) {
            getMessages(user._id);
            subscribeToNewMessages();
        }

        return () => {
            unsubscribeToNewMessages();
        }
    }, [user, subscribeToNewMessages, unsubscribeToNewMessages, authUser]);

    useEffect(() => {
        return () => {
            setMessage('');
        }
    }, []);

    if (!user) {
        return <CheckAuthLoader />;
    }

    return (
        <React.Fragment>
            <section className='h-full flex flex-col py-2 gap-2'>

                {/* HEADER SECTION */}
                <div className='flex px-4 gap-3 items-center pt-2 h-[10.5%]'>
                    <ChevronLeft onClick={handleBack} className='w-5 h-5' />
                    <div className='flex items-center flex-shrink-0 gap-2'>
                        <div className='w-[45px] h-[45px] rounded-full border shrink-0 relative'>
                            <img src={user.profilePic || image} alt="Profile Image" className='w-full object-cover object-center rounded-full h-full' />
                            {
                                onlineUsers.includes(user._id) && (
                                    <div className='absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-white border-2' />
                                )
                            }
                        </div>
                        <div className='flex flex-col w-full'>
                            <h1 className='text-sm font-medium'>{user.name}</h1>
                            {
                                onlineUsers.includes(user._id) ? (
                                    <p className='text-xs w-full gap-4 text-gray-600'>
                                        <span className='font-medium'>Online</span>
                                    </p>
                                ) : (
                                    <p className='text-xs w-full gap-4 text-gray-600'>
                                        <span className='font-medium'>Offline</span>
                                    </p>
                                )
                            }
                        </div>
                    </div>
                </div>

                <hr />

                {/* CHAT CONTAINER SECTION */}
                <div className='flex flex-col overflow-y-auto -mt-2 px-4 border-b rounded-md h-[83.5%] gap-2 pb-10 bg-gray-100 pt-2'>
                    {messages.length > 0 && messages.map((msg, index) => (
                        <Chat key={index} {...msg} />
                    ))}
                </div>

                {/* INPUT SECTION */}
                <div className='flex items-center justify-between px-2 gap-2 h-[6%] flex-shrink-0'>
                    <textarea ref={input} value={message} onChange={(e) => setMessage(e.target.value)} type="text" rows={1} className='px-3 text-sm py-2 w-full outline-none rounded-full scrollbar border resize-none' placeholder='Type a message...' />
                    <button onClick={() => {
                        sendMessage(message, user._id);
                        setMessage('');
                        input.current.focus();
                    }} className='w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-blue-500 hover:bg-blue-600 transition-all text-white ease-in-out'>
                        <SendHorizonal className='w-5 h-5' />
                    </button>
                </div>
            </section>
        </React.Fragment>
    );
}

export default ChatPage;
