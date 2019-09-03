import React, {useState} from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

const AddBook = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [ addBook, { loading: addLoading, error: addError }] = useMutation(addBookMutation);

  const submitForm = (e) => {
    e.preventDefault();
    addBook({ variables: { name, genre, authorId }, refetchQueries: [{query: getBooksQuery}]});
  }

  return (
    <form onSubmit={submitForm} id='add-book'>
      <div className='field'>
        <label>Book Name</label>
        <input onChange={(e) => setName(e.target.value)} type='text'/>
      </div>

      <div className='field'>
        <label>Genre</label>
        <input onChange={(e) => setGenre(e.target.value)} type='text'/>
      </div>

      <div className='field'>
        <label>Author</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select Author</option>
          {
            loading &&
              <option disabled>Loading authors...</option>
          }
          {
            error && 
              <option disabled>Error loading authors.</option>
          }
          {
            data && data.authors
            && data.authors.map(({name, id}) => (
              <option key={id} value={id}>{name}</option>
            ))
          }
        </select>
      </div>

      <button>+</button>
      {
        addLoading
          && <p>Adding book...</p>
      }
      {
        addError
          && <p>Error adding book {addError}</p>
      }
    </form>
  );
};

export default AddBook;
