import React, { useEffect } from 'react';

// Store
import { useUserStore } from '../store/useUserStore';

// Components
import User from '../components/User';

const SearchPage = () => {

    // States
    const { searchUsers, users, fetchUsers } = useUserStore();

    // Handlers
    const searchHandler = (query) => {
        if (query.trim()) {
            searchUsers(query);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <React.Fragment>
            <section className='h-full flex flex-col pt-2 gap-2'>

                {/* HEADER SECTION */}
                <div className='px-4 pt-2'>
                    <h1 className='text-2xl font-medium'>Search</h1>
                </div>

                <hr />

                {/* SEARCH INPUT SECTION */}
                <div className='flex items-center px-4 pb-2 gap-3 flex-shrink-0'>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='w-full border rounded-md p-2'
                        onChange={(e) => {
                            searchHandler(e.target.value);
                        }}
                    />
                </div>

                {/* USERS */}
                <div className='flex flex-col overflow-y-auto pb-10 gap-1'>
                    {
                        users.length > 0 ? users.map((d, index) => (
                            <User key={index} {...d} />
                        )) : <p className='text-center text-gray-600 text-sm'>No users found</p>
                    }
                </div>
            </section>
        </React.Fragment>
    );
}

export default SearchPage;
