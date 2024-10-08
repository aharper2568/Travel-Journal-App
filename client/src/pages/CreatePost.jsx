import { Navigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import { ADD_ENTRY } from '../utils/mutations';

import Auth from '../utils/auth';

const CreateEntry = ({ profileId }) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [content, setContent] = useState('')
  const [picture, setPicture] = useState('')
  const [addEntry, {error}] = useMutation(ADD_ENTRY)

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
    
        <form onSubmit={handleFormSubmit}>
          <input 
            type='text' 
            placeholder='Title' 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          <input 
            type='text' 
            placeholder='Date' 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
          <input 
            type='text' 
            placeholder='Location' 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            required 
          />
          <input
            type='text'
            placeholder='Content' 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
          <input 
            type='text' 
            placeholder='Picture' 
            value={picture} 
            onChange={(e) => setPicture(e.target.value)} 
          />
          <button type='submit'>Submit</button>

          {error && <p>Error occurred while creating entry {error.message}</p>}
          {error && <p>Error occurred: {error.message}</p>}
        </form>
        ) : (<p>You must be logged in to make a new post.</p>)}
      
      </>
)}


export default CreateEntry