import React, { useEffect } from 'react';

// Components
import User from '../components/User';
import ActiveUser from '../components/ActiveUser';

// Store
import { useMessageStore } from '../store/useMessageStore';
import { useUserStore } from '../store/useUserStore';
import { useAuthStore } from '../store/useAuthStore';

const MessagePage = () => {

    // States
    const { subscribeToOnlineUsers, unsubscribeToOnlineUsers, onlineUsers } = useMessageStore();
    const { users, fetchUsers } = useUserStore();
    const { authUser } = useAuthStore();

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (authUser) {
            subscribeToOnlineUsers();
        }

        return () => {
            unsubscribeToOnlineUsers();
        }
    }, [subscribeToOnlineUsers, unsubscribeToOnlineUsers, authUser]);

    return (
        <React.Fragment>
            <section className='h-full flex flex-col pt-2 gap-2'>

                {/* HEADER SECTION */}
                <div className='px-4 pt-2'>
                    <h1 className='text-2xl font-medium'>Messages</h1>
                </div>

                <hr />

                {/* ACTIVE NOW */}
                <div className='flex flex-col px-4 gap-2'>
                    <p className='text-sm text-gray-600 capitalize'>Active Now</p>
                    <div className='flex items-center flex-shrink-0 scrollbar overflow-x-auto gap-1'>
                        {
                            users.length > 0 ? users.map((user, index) => (
                                <div key={index}>
                                    {
                                        onlineUsers.includes(user._id) && (
                                            <ActiveUser {...user} />
                                        )
                                    }
                                </div>
                            )) : null
                        }
                    </div>
                </div>

                <hr />

                {/* USER'S MESSAGES SECTION */}
                <div className='flex flex-col overflow-y-auto gap-1 -mt-2 pt-2 pb-10'>
                    {
                        users.length > 0 ? users.map((user, index) => (
                            <User key={index} {...user} />
                        )) : (
                            <p className='text-center text-sm text-gray-600'>No conversations yet..</p>
                        )
                    }
                </div>
            </section>
        </React.Fragment>
    );
}

export default MessagePage;
