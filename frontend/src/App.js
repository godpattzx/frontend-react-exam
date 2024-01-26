import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [books, setBooks] = useState(null);
  const [priceS, setPriceS] = useState(0);
  const [priceF, setPriceF] = useState(10000);

  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/books?populate=*&filters[price][$gte]=${priceS}&filters[price][$lte]=${priceF}`)
      .then((response) => {
        console.log("Data from API:", response.data);
        setBooks(response.data.data);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, [priceS, priceF]);

  return (
    <div>
      <div className="search-input mb-3">
        <input
          type="number"
          placeholder="Price Start"
          onChange={(e) => setPriceS(e.target.value)}
          value={priceS}
        />
      </div>
      <div className="search-input mb-3">
        <input
          type="number"
          placeholder="Price Final"
          onChange={(e) => setPriceF(e.target.value)}
          value={priceF}
        />
      </div>
      <Table className="table table-striped table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Title</th>
            <th>Detail</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.map((data) => (
              <tr key={data.id}>
                <td>{data.attributes.title}</td>
                <td>{data.attributes.description}</td>
                <td>{data.attributes.price}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
