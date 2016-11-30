var express = require('express');
var app = express();
var _ = require('underscore');
var port = process.env.PORT || 3000;
var db = require('./db.js');
var bcrypt = require('bcryptjs');
var middelware = require('./middelware.js')(db);


/*
var todos = [{
		id: 1,
		description: 'Play Cricket',
		completed: false
	},

	{
		id: 2,
		description: 'Eat Samosa',
		completed: true
	},

	{
		id: 3,
		description: 'code',
		completed: true
	}	

]

*/

// Creating todos

app.post('/todos', function(req, res) {
	var body = _.pick(req.body, 'description', 'completed');

	db.todo.create(body).then(function(todo){
        res.json(todo.toJSON());
		}, function(e){
           res.status(400).json(e);
		});
});


app.get('/', function(req, res) {

	res.send('Todo API Root!');
});



// Display all model instances

app.get('/todos', middelware.requireAuthentication, function(req, res) {
	db.todo.findAll().then(function(todos) {
		
		res.json(todos);
	});

});


// Display specific instance

app.get('/todos/:id', middelware.requireAuthentication, function(req, res) {
	var getid = parseInt(req.params.id, 10);
	db.todo.findById(getid).then(function(todo) {
		if (todo) {
			res.json(todo.toJSON());
		} else {
			res.status(404).send();
		}
	});

});


// Display filtered records based on query

app.get('/todos', function(req, res) {
	var query = req.query;
	var queryObject = {};

	if (query.hasOwnProperty('completed') && query.completed === true) {
		queryObject.completed = true;
	} else if (query.hasOwnProperty('completed') && query.completed === false) {
		queryObject.completed = false;
	}

	if (query.hasOwnProperty('q') && query.q.length > 0) {
		queryObject.description = {
			$like: '%' + query.q + '%'
		};

	}

	db.todo.findAll({
		where: queryObject
	}).then(function(todos) {
		res.json(todos);
	});

});


// Delete specific instances 


app.delete('/todos/delete/:id', middelware.requireAuthentication, function(req, res) {
	var delete_id = parseInt(req.params.id, 10);
	db.todo.destroy({
		where: {
			id: delete_id
		}
	}).then(function(todo) {
		if (!todo) {
			res.status(404).send();
		} 
	}).then(function(){
		var todos = db.todo.findAll();
		res.json(todos);
	});

});


// Display all model instances
app.get('/users', function(req, res) {
	db.user.findAll({attributes: ['id', 'email']}).then(function(users) {
		res.json(users);
	}).catch(function(e) {
		console.log(e);
	});

});

// Display specific instance
app.get('/users/:id', function(req, res) {
	var getid = parseInt(req.params.id, 10);
	var matchedTodo;

	db.user.findById(getid).then(function(user) {
		if (user) {
			res.json(user.toPublicJSON());
		} else {
			res.status(404).send();
		}
	});

});


//creating users

app.post('/users', function(req, res) {
	var body = _.pick(req.body, 'email', 'password');

	db.user.create(body).then(function(user){
		if(user){
         res.json(user.toJSON());
		}
		else{
			res.status(400).send();
		}
	});
});

//login users

app.post('/users/login', function(req, res) {
	var body = _.pick(req.body, 'email', 'password');
	db.user.authenticate(body).then(function(user) {
		res.header('Auth', user.genToken('authentication')).json(user.toPublicJSON());
	}, function() {
		res.status(401).send();
	});

});
	



/*
db.todo.sync({
	force: true
}).then(function() {

	return db.todo.create({
		description: 'eat samosa',
		completed: true
	}).then(function() {
		return db.todo.create({
			description: 'play cricket',
			completed: false
		})
	}).then(function() {
		return db.todo.findById(2).then(function(todo) {
            if (todo) {
				console.log(todo.toJSON());
			} else {
				console.log('The specific instance does not exists');
			}
		})

	}).catch(function(e) {
		console.log(e);
	});
});

*/


/*


// Adding user instances

db.user.sync({
	force: true
}).then(function() {
	return db.user.create({
		email: 'akash.123srm@gmail.com',
		password: 'abcdefg'
	}).then(function() {
		return db.user.create({
			email: 'akkirocks8@gmail.com',
			password: 'cvfghef'
		}).catch(function(e) {
			console.log(e);
		});
	});
});
		
*/


db.sequelize.sync({force: true}).then(function() {
	app.listen(port, function() {
		console.log('Example app listening on port' + port + '!');
	});
});