import React, {useState} from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from '../queries/queries';
import BookDetails from "./BookDetails";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);

  const [selected, setSelected] = useState(null);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && data.books && (
        <ul id="book-list">
          {data.books.map(({ name, id }) => (
            <li onClick={(e) => { setSelected(id)}} key={id}>{name}</li>
          ))}
        </ul>
      )}
      {
        selected
        && <BookDetails bookId={selected}></BookDetails>
      }
    </div>
  );
};

export default BookList;
