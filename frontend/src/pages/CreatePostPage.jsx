import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2 } from "lucide-react";

// Store
import { usePostStore } from '../store/usePostStore';

const CreatePostPage = () => {

    // States
    const { loading, createPost } = usePostStore();
    const [media, setMedia] = useState(null);
    const [mediaType, setMediaType] = useState('');
    const [caption, setCaption] = useState('');

    // Handlers
    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMedia(reader?.result);
                setMediaType(file.type.split('/')[0] === 'image' ? 'image' : 'video');
            };

            reader.readAsDataURL(file);
        }
    }

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    }

    const handleSubmit = () => {
        if (!media || !mediaType) {
            toast('Please fill in all the fields');
            return;
        }

        createPost({ mediaUrl: media, mediaType: mediaType, caption: caption });
    }

    return (
        <React.Fragment>
            <section className='h-full flex flex-col pt-2 gap-2 overflow-y-auto'>

                {/* HEADER SECTION */}
                <div className='px-4 pt-2 flex items-center justify-between'>
                    <h1 className='text-2xl font-medium'>Create Post</h1>
                    {
                        loading ? <Loader2 className='w-5 h-5 animate-spin text-blue-500' /> : <button disabled={loading} onClick={handleSubmit} className='text-sm font-medium text-blue-500'>Submit</button>
                    }
                </div>

                <hr />

                {/* MEDIA PREVIEW SECTION */}
                <div className='flex flex-col px-4 gap-2'>
                    <input type='file' accept='image/*,video/*' onChange={handleMediaChange} style={{ display: 'none' }} id='mediaInput' />
                    <label htmlFor='mediaInput' className='text-blue-500 cursor-pointer border rounded-md px-2 py-1'>
                        Select media
                    </label>
                    {media && (
                        <div className='flex justify-center'>
                            {media.startsWith('data:image/') ? (
                                <img src={media} alt='Preview' className='aspect-square rounded-md object-cover object-center' />
                            ) : (
                                <video controls className='max-w-full h-auto'>
                                    <source src={media} type='video/mp4' />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    )}
                </div>
                {/* CAPTION SECTION */}
                <div className='px-4'>
                    <textarea placeholder='Write a caption...' className='w-full border rounded-md p-2' value={caption} onChange={handleCaptionChange} />
                </div>
            </section>
        </React.Fragment>
    );
}

export default CreatePostPage;

