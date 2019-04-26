const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use(bodyParser.json());
const database = {
	users: [
	{
		id: '123',
		name: 'John',
		password: 'cookies',
		email: 'john@gmail.com',
		entries: 0,
		joined: new Date()
	},
	{
		id: '124',
		name: 'Mary',
		password: 'apples',
		email: 'mary@gmail.com',
		entries: 0,
		joined: new Date()
	}
],
login: [
	{
		id: '987',
		hash: '',
		email: 'john@gmail.com'
	}
]
}





app.get('/', ( req, res)=> {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		  req.body.password === database.users[0].password) {
      res.json(database.users[0]);
	} else {
	res.status(400).json('error logging in');
}
})

app.post('/register', (req, res) => {
		const { email, name, password } = req.body;
	database.users.push({
		id: '125',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
		})
		res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		found = true;
		if(user.id === id) {
			return res.json(user);
		}
	})
	if (!found) {
		res.status(404).json('no such user');
	}
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	})
	if (!found) {
		res.status(400).json('not found');
	}
})



app.listen(3000, () => {
	console.log('app is running on port 3000');
})
