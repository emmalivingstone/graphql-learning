import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBookQuery } from '../queries/queries';

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(getBookQuery, {variables: {id: bookId}});

  return (
    <div id="book-details">
      {
        loading
        && <p>Loading...</p>
      }
      {
        error
        && <p>Error: {error}</p>
      }
      {
        !loading && !error && data && data.book
        && (
          <React.Fragment>
            <h2>{data.book.name} by {data.book.author.name}</h2>
            <p>Genre - {data.book.genre}</p>
            <strong>Other books by {data.book.author.name}:</strong>
            <ul>
              {
                data.book.author.books.map(book => (
                  <li key={book.id}>{book.name}</li>
                ))
              }
            </ul>
          </React.Fragment>
        )
      }
      <h1></h1>
    </div>
  );
};

export default BookDetails;
