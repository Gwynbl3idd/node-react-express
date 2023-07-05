const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'aksjcfvakjsbfcjafclanfclka',
}));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));

app.use((req, res, next) => {
    console.log('enters');
    if(!req.cookies?.visited) {
        console.log('cookie not present');
        res.cookie('visited', true, {maxAge: 18000});
        next();
    }
    else console.log('Welcome back');
    next();
});

const data = [
    {
        name: 'A Song of Ice and Fire',
        genre: 'Fantasy',
        author: 'George R R Martin',
    },
    {
        name: 'The Wheel of Time',
        genre: 'Fantasy',
        author: 'Robert Jordan',
    },
    {
        name: 'Wings of Fire',
        genre: 'Autobiography',
        author: 'A P J Abdul Kalam',
    }
];

app.get('/books', (req, res) => {
    res.send(data);
});

app.get('/shopping/cart', (req, res) => {
    const {cart} = req.session;
    if (!cart) {
        res.send('You have no cart session');
    }
    else res.send(cart);
})

app.post('/addBooks',(req, res) => {
    data.push(req.body);
});

app.post('/shopping/cart/item', (req, res) => {
    console.log(req.body);
    const name = req.body;
    const cartItem = name;
    const {cart} = req.session;
    if (cart) {
        req.session.cart.items.push(cartItem);
    }
    else {
        req.session.cart = {
            items: [cartItem],
        };
    }
    res.send(201);
})

app.delete('/removeBook', (req, res) => {
    const bookToBeRemoved = req.body;

    data.splice(data.findIndex(book => book.name === bookToBeRemoved.name) , 1);
});


app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.listen(process.env.PORT || 8080);