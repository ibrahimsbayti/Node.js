//  to controll ur website

const express = require('express');
const app = express();
const port = 5000;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const User = require('./models/userSchema');
const Product = require('./models/productSchema');

// for auto refresh
// const path = require('path');
// const livereload = require('livereload');
// const liveReloadServer = livereload.createServer();
// liveReloadServer.watch(path.join(__dirname, 'public'));

// const connectLivereload = require('connect-livereload');
// app.use(connectLivereload());

// liveReloadServer.server.once('connection', () => {
//   setTimeout(() => {
//     liveReloadServer.refresh('/');
//   }, 100);
// });

// mongoose
const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://ibrahim:is93@cluster0.k7hmqlq.mongodb.net/?retryWrites=true&w=majority'
  )
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })

  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.redirect('/register');
});

app.get('/all-products', (req, res) => {
  Product.find()
    .then((result) => {
      res.render('tableProducts', { mytitle: 'Products', arrProduct: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/Login', (req, res) => {
  Product.find()
    .then((result) => {
      res.render('tableProducts', { mytitle: 'Products', arrProduct: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/register', (req, res) => {
  res.render('register', { mytitle: 'Register' });
});

app.get('/login', (req, res) => {
  User.find()
    .then((result) => {
      res.render('login', { mytitle: 'Login', arrUser: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/add-new-product', (req, res) => {
  res.render('add-new-product', { mytitle: 'create new product' });
});

app.post('/register', (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then((result) => {
      res.redirect('/login');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/all-products', (req, res) => {
  const product = new Product(req.body);

  product
    .save()
    .then((result) => {
      res.redirect('/all-products');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/all-products/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((params) => {
      res.json({ mylink: '/all-products' });
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.get('/update-product/:id', (req, res) => {
//   Product.findById(req.params.id)
//     .then((result) => {
//       res.render('update-product', { mytitle: 'Update', objproduct: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//  404
app.use((req, res) => {
  res.status(404).send('Sorry Not Found!');
});
