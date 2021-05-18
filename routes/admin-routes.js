const router = require("express").Router();
module.exports = router;

const Auth = require('../modules/auth-module.js')
const Admins = require('../modules/admin-module.js');
const Dogs = require('../modules/dogs-module.js');
const bcrypt = require('bcryptjs');

//Register 
router.post('/register', (req, res) => {
    const user = req.body
    if(!user.username && !user.password ) {
      res.status(401).json({ message: "Please provide a username and password for this user."})
    }
    else {
    Auth.register(user)
     .then(data => {
      res.status(200).json(data)
     })
     .catch(err => {
      res.status(500).json({ message: ` Failed to register `, error: err });
     });
    }
  });
//Login 
router.post('/login', (req, res) => {
    const {username, password} = req.body
    Auth.login(username)
    .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = Auth.generateToken(user); // new
        res.status(200).json({
        message: `Welcome ${user.username}!, have a token...`,
        token,
        id: user.id,
        });
    } else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
    })
    .catch(error => {
    res.status(500).json(error);
    });
});
//Get an Admin by Id 
router.get('/:id', (req, res) => {
 Admins.findById(req.params.id)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err =>{
        res.status(500).json(err) 
    })
});
// Update a Admin
router.put('/:id', (req, res) => {
    const changes = req.body
    Admins.updateAdmin(req.params.id, changes)
    .then(data=>
        res.status(200).json(data))
    .catch(err=>{
        res.status(500).json(err)
    })
});
// Delete an Admin 
router.delete('/:id', (req, res) => {
  Admins.remove(req.params.id)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(error =>{
        res.status(500).json(error) 
    })
});
// Add a new Dog
router.post('/dogs', (req, res) => {
  const dog =  req.body
  Dogs.add(dog)
  .then(data=>
    res.status(201).json(data))
.catch(err=>{
    res.status(500).json(err)
})
});
// Edit a Dog
router.put('/dogs/:id', (req, res) => {
    const changes = req.body
    Admins.updateDog(req.params.id, changes)
    .then(data=>
        res.status(200).json(data))
    .catch(err=>{
        res.status(500).json(err)
    })
});
// Delete A Dog
router.delete('/dogs/:id', (req, res) => {
    Admins.removeDog(req.params.id)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(error =>{
        res.status(500).json(error) 
    })
});
// Remove a Breed
router.delete('/breeds/remove', (req, res) => {
    const {dog_id, breed_id} = req.body
    Admins.removeBreed(dog_id, breed_id)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(error =>{
        res.status(500).json(error) 
    })
});
//Assign a Breed
router.post('/breeds/assign', (req, res)=>{
    const {dog_id, breed_id} = req.body
    Admins.assignBreed(dog_id, breed_id)
    .then(data=>{
        res.status(201).json(data)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})
// Add a new Breed 
router.post('/breeds/:id', (req, res) => {
    const dog_ID = req.params.id
    const breed = req.body
    Admins.addBreed(breed, dog_ID)
    .then(data=>{
        res.status(201).json(data)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
});

// Edit a Kennel
router.put('/kennels/:id', (req, res) => {
   const changes = req.body
   Admins.updateKennel(req.params.id, changes)
   .then(data=>
       res.status(200).json(data))
   .catch(err=>{
       res.status(500).json(err)
   })
});
// Get Notifications
router.get('/notifications/:id', (req, res) => {
    const id = req.params.id
    Admins.getNotifications(id)
    .then(data=>
        res.status(200).json(data))
    .catch(err=>{
        res.status(500).json(err)
    })
});

module.exports = router;