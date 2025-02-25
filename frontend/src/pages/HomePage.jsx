import { PlusSquare, Recycle } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Store
import { usePostStore } from "../store/usePostStore";

// Components
import Post from "../components/Post";

const HomePage = () => {

    // States
    const navigate = useNavigate();
    const { fetchPosts, posts } = usePostStore();

    useEffect(( ) => {
        fetchPosts();
    }, []);

    return (
        <React.Fragment>
            <section className='h-full flex flex-col pt-2'>

                <div className='flex justify-between items-center px-4 pt-2 pb-3'>
                    <Recycle onClick={() => {
                        fetchPosts();
                    }} className='w-5 h-5 text-lime-500' />
                    <PlusSquare onClick={() => {
                        navigate('/create/post');
                    }} className='w-5 h-5 hover:animate-spin text-red-500 transition-all' />
                </div>

                <hr />

                <section className='flex flex-col overflow-y-auto pt-2 pb-10 scrollbar gap-6'>
                    {
                        posts.length > 0 ? posts.map((post, index) => (
                            <Post key={index} {...post} />
                        )) : <p className='text-center text-sm text-gray-600'>
                            No posts found
                        </p>
                    }
                </section>
            </section>
        </React.Fragment>
    );
}

export default HomePage;
