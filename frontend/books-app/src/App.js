
import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import './App.css';

function App() {

  const [books, setBook] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("")
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  useEffect(() => {
    getBooks()
  }, [])

  const deployedUrl = "https://bookmock.onrender.com"

  // getting books from db 
  const getBooks = async () => {
    try {
      const response = await axios.get(`${deployedUrl}/getbook`)
      console.log("🚀 ~ file: App.js:24 ~ getBooks ~ response:", response)
      setBook(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  // adding a book to the db
  const addnewBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${deployedUrl}/add`, {
        title, author, genre, description, price
      })
      getBooks();
      setTitle("")
      setAuthor("")
      setGenre("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.log(error)
    }
  }

  // deleting a book from db
  const deleteBook = async (_id) => {
    try {
      await axios.delete(`${deployedUrl}/deletebook/${_id}`, {
        title, author, genre, description, price
      })
      getBooks();

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div>
      <h1>
        Add a book to the list
      </h1>
      <form onSubmit={addnewBook}>
        <label>title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <label>author</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <br />
        <label>genre</label>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="Comic">Comic</option>
        </select>
        <label>description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
        <label>price</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        <br />
        <input type="submit"> Add new book</input>
      </form>

      <h1>List of all the books </h1>
      {books.map((mybook) => (
        <div key={mybook._id}>
          <h2>{mybook.title}</h2>
          <h1>{mybook.author}</h1>
          <h1>{mybook.genre}</h1>
          <h1>{mybook.description}</h1>
          <h1>{mybook.price}</h1>
          <button onClick={() => deleteBook(mybook._id)}>Delete book</button>
        </div>
      ))}
    </div>
  )

}

export default App;
