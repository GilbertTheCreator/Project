const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');

app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

const users = [
  { "id": 1, "name": "John" },
  { "id": 2, "name": "Jane" }
];

function Useradd(user) {
  return new Promise((resolve, reject) => {
    if (user && user.name) {
      user.id = users.length + 1;
      users.push(user);
      resolve(user);
    } else {
      reject(new Error('Data was invalid'));
    }
  });
}

function UserId(userId) {
  return new Promise((resolve, reject) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      resolve(user);
    } else {
      reject(new Error(`User not found`));
    }
  });
}

app.get('/api/users', (req, res) => {
  res.render('users.ejs');
});

app.post('/api/users', async (req, res) => {
    const newUser = {
      name: req.body.name
    };
    const user = await Useradd(newUser);
    res.redirect('/api/users');
});

app.put('/api/users/update/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedName = req.body.name;
    const user = await UserId(userId);

    if (user) {
      user.name = updatedName;
      res.status(200).send(`User Updated`);
    }
  }
);

app.delete('/api/users/delete/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users.splice(index, 1);
      res.redirect('/api/users');
    }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:3000/`);
});
