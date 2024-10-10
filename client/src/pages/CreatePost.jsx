import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_ENTRY, UPLOAD_IMAGE } from '../utils/mutations';

import Auth from '../utils/auth';

const CreateEntry = ({ profileId }) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [content, setContent] = useState('')
  const [picture, setPicture] = useState('')
  const [addEntry, { error }] = useMutation(ADD_ENTRY)
  const [uploadImage, { error: imageError }] = useMutation(UPLOAD_IMAGE)

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
      const { data } = await uploadImage({
        variables: {
          file: file,
        }
      });
      console.log(data)
      console.log(file, picture)
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
          picture
        }
      });

      setTitle('')
      setDate('')
      setLocation('')
      setContent('')
      setPicture('')
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
                  type='file'
                  name='image'
                  id='image'
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <button
                type='submit'
                className="w-full p-3 text-white rounded-lg transition duration-300 hover:scale-105"
                style={{ background: '#DA8359' }}
              >
                Submit
              </button>

              {error && <p className="mt-2 text-red-600">Error occurred: {error.message}</p>}
            </form>
          </div>
        </main>
      ) : (<p>You must be logged in to make a new post.</p>)}

    </>
  )
}


export default CreateEntry