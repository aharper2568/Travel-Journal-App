import { Navigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import { ADD_ENTRY } from '../utils/mutations';

import Auth from '../utils/auth';

const CreateEntry = ({ profileId }) => {
  const [entry, setEntry] = useState('')
  const [addEntry, {error}] = useMutation(ADD_ENTRY)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await addEntry({
        variables: {profileId, entry}
      });

      setEntry('')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
        {Auth.loggedIn() ? (
    
        <form onSubmit={handleFormSubmit}>
          <input type='text' placeholder='title'></input>
          <input type='text' placeholder='content'></input>
          <button type='submit'>submit</button>
    
        </form>
        ) : (<p>You must be logged in to make a new post.</p>)}
      
      </>
)}


export default CreateEntry