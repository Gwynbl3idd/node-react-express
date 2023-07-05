import {useState} from "react";

const [books, setBookData] = useState([]);

const [formValues, setFormValues] = useState({});
const [searchField, setSearchField] = useState('');
const [cart, setCart] = useState('');
const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
};

const handleCart = (e) => {
    setCart({[e.target.id]: e.target.value});
}

const fetchData = async () => {
    try {
        const response = await fetch('/books');

        const json = await response.json();

        setBookData(json);

    } catch (error) {
        console.log("error", error);
    }
};

const getBooksData = () => {
    fetchData();
};

const addBooks = (e) => {
    e.preventDefault();
    let options = {
        method: 'POST',
        headers: {
            'Content-Type':
                'application/json;charset=utf-8'
        },
        body: JSON.stringify(formValues),
    }

    fetch('/addBooks', options)
        .then(response => response.json())
        .then(resData => console.log('res data', resData));
};

const deleteBook = (book) => {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type':
                'application/json;charset=utf-8'
        },
        body: JSON.stringify(book),
    }
    try {
        const response = fetch('/removeBook', options);
        console.log('Deleted successfully', response);
    } catch (error) {
        console.log("error", error);
    }
};

const searchBook = async (book) => {
    const response = await fetch(`/books/${book}`);
    const json = await response.json();

    setBookData(json);
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

    fetch('/shopping/cart/item', options)
        .then(response => response.json())
        .then(resData => console.log('res data', resData));
}


<button onClick={getBooksData}> get books </button>
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