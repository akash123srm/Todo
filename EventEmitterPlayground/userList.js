
var util = require("util");
var emitter = require("events").EventEmitter;
var id = 1;

var data = {
	'users': [
     
     { id: id++, name: "Joe Smith",  occupation: "developer"    },
     { id: id++, name: "Jane Doe",   occupation: "data analyst" },
     { id: id++, name: "John Henry", occupation: "designer"     }

	]
}

function UserList(instance){
	//EventEmitter.call(this);
	//var me = this;
	var e = new emitter();
	instance.id = id++;
    data.users.push(instance);
    e.emit('saved-user', instance);
    return e;
}

//util.inherits(UserList, emitter);

var profile = UserList({ name: "Rocky", occupation: "manager" });

profile.on('saved-user', function (data) {
	console.log(" User with name " + data.name + " and occupation " + " (" + data.occupation + ")" + " succssfully saved");
	console.log('aasd');
}); 

/*
function save(instance){
  instance.id = id++;
  data.users.push(instance);
  user.emit('saved-user',instance);
}
*/



//user.save({ name: "Jane Doe", occupation: "manager" });
//user.save({ name: "Akash Nayyar", occupation: "Developer" });


console.log(data);


