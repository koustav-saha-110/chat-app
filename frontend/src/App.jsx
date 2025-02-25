import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import { BiLoader } from 'react-icons/bi';

// Store
import { useAuthStore } from './store/useAuthStore';
import { useMessageStore } from './store/useMessageStore';
import { usePostStore } from './store/usePostStore';

// Components and Pages
import NavMenu from './components/NavMenu';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import MessagePage from './pages/MessagePage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import CreatePostPage from './pages/CreatePostPage';

const App = () => {

  // States
  const { authUser, checkingAuth, checkAuth } = useAuthStore();
  const { subscribeToOnlineUsers, unsubscribeToOnlineUsers } = useMessageStore();
  const { subscribeToNewPosts, unsubscribeToNewPosts } = usePostStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser) {
      subscribeToOnlineUsers();
      subscribeToNewPosts();
    }

    return () => {
      unsubscribeToOnlineUsers();
      unsubscribeToNewPosts();
    }
  }, [subscribeToNewPosts, unsubscribeToNewPosts, subscribeToOnlineUsers, unsubscribeToOnlineUsers, authUser]);

  if (checkingAuth) {
    return CheckAuthLoader();
  }

  return (
    <React.Fragment>
      <Toaster position='top-center' />
      <section className='flex flex-col w-full h-screen'>
        <div className={`${authUser ? 'h-[91%]' : 'h-full'} w-full`}>

          <Routes>
            <Route path='/' element={authUser ? <HomePage /> : <AuthPage />} />
            <Route path='/create/post' element={authUser ? <CreatePostPage /> : <AuthPage />} />
            <Route path='/auth' element={authUser ? <AuthPage /> : <HomePage />} />
            <Route path='/search' element={authUser ? <SearchPage /> : <AuthPage />} />
            <Route path='/messages' element={authUser ? <MessagePage /> : <AuthPage />} />
            <Route path='/profile' element={authUser ? <ProfilePage /> : <AuthPage />} />
            <Route path='/chat/:id' element={authUser ? <ChatPage /> : <AuthPage />} />
          </Routes>

        </div>
        {
          authUser && (
            <NavMenu />
          )
        }
      </section>
    </React.Fragment>
  );
}

export default App;

export function CheckAuthLoader() {
  return (
    <React.Fragment>
      <div className='w-full h-screen flex items-center justify-center'>
        <BiLoader className='animate-spin text-blue-700 w-14 h-14' />
      </div>
    </React.Fragment>
  );
}
