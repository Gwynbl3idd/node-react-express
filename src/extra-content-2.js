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


