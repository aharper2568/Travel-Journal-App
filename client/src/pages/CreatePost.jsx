import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useState, useRef } from 'react';
import { ADD_ENTRY, UPLOAD_IMAGE } from '../utils/mutations';

import Auth from '../utils/auth';
import { QUERY_ME, QUERY_SINGLE_USER } from '../utils/queries';

const CreateEntry = ({ profileId }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [picture, setPicture] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const imageInputRef = useRef();
  const { id } = useParams();
  const [addEntry, { error }] = useMutation(ADD_ENTRY, {
    refetchQueries:[
      {
        query: id ? QUERY_SINGLE_USER : QUERY_ME,
      }
    ]
  });
  const [uploadImage, { error: imageError }] = useMutation(UPLOAD_IMAGE);

  if (imageError) console.log(imageError);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(URL.createObjectURL(file));

    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      setPicture(URL.createObjectURL(file));

      const variables = {
        id: imageInputRef.current.id,
        image: file,
      };

      console.log('VARIABLES', variables);

      const { data } = await uploadImage({
        variables
      });

      setImageUrl(data.uploadImage.secure_url);
      setIsImageUploaded(true);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addEntry({
        variables: {
          profileId,
          title,
          date,
          location,
          content,
          picture: imageUrl
        }
      });

      setTitle('')
      setDate('')
      setLocation('')
      setContent('')
      setPicture('')
      setImageUrl('')
      isImageUploaded(false)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      {Auth.loggedIn() ? (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
          <div style={{ background: '#A5B68D' }} className="max-w-md w-full p-6 border-gray-300 rounded-lg shadow-lg">
            <form style={{ background: '#ECDFCC' }} onSubmit={handleFormSubmit} className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">Create New Post</h2>

              <input
                type='text'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded"
                style={{ background: '#FCFAEE' }}
              />

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="w-full p-4 mb-4 border-2 border-dashed border-gray-300 rounded-lg text-center"
                style={{ background: '#FCFAEE' }}
              >
                {picture ? (
                  <img src={picture} alt="Preview" className="mb-2 rounded-md" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} />
                ) : (
                  <p className="text-gray-500">Drag & drop a picture here.</p>
                )}
                <input
                  ref={imageInputRef}
                  type='file'
                  name='image'
                  id='image'
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <input
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded"
                style={{ background: '#FCFAEE' }}
              />

              <input
                type='text'
                placeholder='Location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full p-3 mb-4 border border-gray-300"
                style={{ background: '#FCFAEE' }}
              />

              <textarea
                placeholder='Content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full p-3 mb-4 border border-gray-300"
                style={{ background: '#FCFAEE' }}
              />
              
              <button
                type='submit'
                className={`w-full p-3 text-white rounded-lg transition duration-300 hover:scale-105 ${!isImageUploaded ? 'transition duration-300 hover:scale-95 bg-gray-400 cursor-not-allowed' : 'bg-[#DA8359]'}`}
                disabled={!isImageUploaded}
              >
                Submit
              </button>

              {error && <p className="mt-2 text-red-600">Error occurred: {error.message}</p>}
            </form>
          </div>
        </main>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <h4 className="text-lg">
            You need to be logged in to create a post. Use the navigation links above to sign up or log in!
          </h4>
        </div>
      )}
    </>
  )
}


export default CreateEntry
