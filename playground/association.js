var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	dialect: 'sqlite',
	// SQLite only
	storage: __dirname + '/association.sqlite'
});


var Todo = sequelize.define('todo', {
		description: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		completed: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
});


var User = sequelize.define('user',{

	email: {
		type: Sequelize.STRING,
		allowNull: false,





		unique: true,
		validate: {
		isEmail: true // Built in function from sequelize to check for valid emails
		}
	}
});


Todo.belongsTo(User);
User.hasMany(Todo);


sequelize.sync({
	//force: true
}).then(function() {
	console.log('Sync successfull');

	User.findById(1).then(function(user){
		user.getTodos().then(function(todos){
            todos.forEach(function(todo){
            	console.log(todo.toJSON());
            });

		});
	});
    
    /*
	User.create({
		email: 'akash.123srm@gmail.com'
	}).then(function() {
		return Todo.create({
			description: 'do some charity'
		});
	}).then(function(todo) {
		User.findById(1).then(function(user) {
			user.addTodo(todo);
		});
	}); */

});




