import { Navigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import { ADD_JOURNAL } from '../utils/mutations';

import Auth from '../utils/auth';

const JournalForm = ({ profileId }) => {
  const [entry, setEntry] = useState('')
  const [addJournal, {error}] = useMutation(ADD_JOURNAL)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await addJournal({
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


export default JournalForm