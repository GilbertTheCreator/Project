const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override')

app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))

app.use((req,res,next) =>{
console.log(`${req.method} request for ${req.url}`);
next()
})


const users = [
  { "id": 1, "name": "John" },
  { "id": 2, "name": "Jane" }
]

app.get('/', (req, res) =>{
  res.send(`<button ><a href="/api/users""> users </a> </button> <button ><a href="/api/users/add""> add users </a> </button> `)
})

app.get('/api/users', (req,res) =>{
  res.render("users.ejs", {users})
})

app.get('/api/users/add', (req,res) =>{
  res.render('userForm.ejs');
})

// we will continue this on thusday
app.get('/api/users/add/:id', (req,res) =>{
  res.render('updateUser.ejs');
})

app.post('/api/users', (req, res)=>{

    console.log(req.body.name);

    const newUser ={
    id:users.length + 1,
    name: req.body.name
    };

    users.push(newUser);
    res.redirect('/api/users');

})


// Define a PUT route handler for updating a workout.
app.put('/api/users/update/:id', (req, res) => {
    console.log("fired put");
    const userId = parseInt(req.params.id);
    const updatedName = req.body.name;

    const user = users.find(w => w.id === userId);

    if (user) {
      user.name = updatedName;
      res.status(200).send(`Workout with ID ${userId} updated.`);
    } else {
      res.status(404).send(`Workout with ID ${userId} not found.`);
    }
  });


// Define a DELETE route handler for deleting a workout.
app.delete('/api/users/delete/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    const index = users.findIndex(w => w.id === userId);

    if (index !== -1) {
      users.splice(index, 1);
      res.redirect('/api/users')
    } else {
      res.status(404).send(`Workout with ID ${userId} not found.`);
    }
  });

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}/`);
})