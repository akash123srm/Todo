module.exports = function(sequelize, DataTypes) {
	return sequelize.define('todo', {
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	});
};


/*

Todo.sync({
	force: true
}).then(function() {

	return Todo.create({
		description: 'eat samosa',
		completed: true
	}).then(function() {
		return Todo.create({
			description: 'play cricket',




			completed: false
		})
	}).then(function() {
		return Todo.findById(2).then(function(todo) {
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



