var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	dialect: 'sqlite',
	// SQLite only
	storage: __dirname + '/data/models.sqlite'
});

var db = {};
db.todo = sequelize.import(__dirname + '/models/todo.js');
db.user = sequelize.import(__dirname + '/models/user.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Creating association between the two models

//db.todo.belongsTo(db.user);
//db.user.hasMany(db.todo);

module.exports = db;




	