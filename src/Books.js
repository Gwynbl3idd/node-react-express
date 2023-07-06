import './App.css';
import {useEffect, useState} from "react";

function Books() {
    const [books, setBookData] = useState([]);

    const [formValues, setFormValues] = useState({});
    const [cart, setCart] = useState('');
    const [update, setUpdate] = useState('');
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.id]: e.target.value });
    };

    const handleCart = (e) => {
        setCart({[e.target.id]: e.target.value});
    }

    const getBooksData = async () => {
        try {
            const response = await fetch('/books');

            const json = await response.json();

            setBookData(json);
            setUpdate('Books has been fetched');

        } catch (error) {
            console.log("error", error);
        }
    };

    const addBooks = async (e) => {
        e.preventDefault();
        let options = {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(formValues),
        }

        setUpdate('Books have been added. Click Get Books to see');

        const response = await fetch('/addBooks', options)
            .then(response => response.json())
            .then(resData => console.log('res data', resData));

        console.log(response);
    };

    const deleteBook = async (book) => {
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type':
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(book),
        }
        try {
            const response = await fetch('/removeBook', options);
            console.log('Deleted successfully', response);
            setUpdate('Book have been deleted. Click Get Books to see');
        } catch (error) {
            console.log("error", error);
        }
    };

    const addToCart = async() => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(cart),
        }

        setUpdate('Item has been added to cart');

        const response = await fetch('/shopping/cart/item', options)
            .then(response => response.json())
            .then(resData => console.log('res data', resData));

        console.log(response);
    }

    return (
        <div className="App">
            <header className="App-header">
                {update}
                <button onClick={getBooksData}> Get Books </button>
                {books.length!=0 && books.map((book) => (
                    <div className='books'>
                        <p> Name: {book.name}</p>
                        <p> Genre: {book.genre}</p>
                        <p> Author: {book.author}</p>
                        <button onClick={() => deleteBook(book)}>Delete</button>
                    </div>
                ))}

                <form onSubmit={addBooks}>
                    <div>Add Books here</div>
                    <div className='book-table'>
                        <div>
                            <label htmlFor="name">Book Name</label>
                            <input
                                type="text"
                                id="name"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="genre">Genre</label>
                            <input
                                type="genre"
                                id="genre"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="name">Author</label>
                            <input
                                type="author"
                                id="author"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>

                <div>
                    <label htmlFor="book-name">Add to cart</label>
                    <input
                        type="cart-item"
                        id="cart-item"
                        onChange={handleCart}
                    />
                    <button onClick={addToCart}>Submit</button>
                </div>
            </header>
        </div>
    );
}

export default Books;
