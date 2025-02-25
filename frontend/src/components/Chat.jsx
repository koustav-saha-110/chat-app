import React from 'react';

// Store
import { useAuthStore } from '../store/useAuthStore';

const Chat = ({ sender, message, hour, minute }) => {

    // States
    const { authUser } = useAuthStore();

    return (
        <React.Fragment>
            <div className={`${sender === authUser?._id ? 'self-end' : 'self-start'} max-w-[75%] flex flex-col gap-1 text-sm`} >
                <p className={sender === authUser._id ? 'p-2 text-white bg-blue-500 rounded-xl' : 'p-2 bg-white rounded-xl'}>
                    {message}
                </p>
                <div className={`text-xs text-gray-600 gap-2 flex items-center self-end`}>
                    <span>{hour}:{minute}</span>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Chat;
