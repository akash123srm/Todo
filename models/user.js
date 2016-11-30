
var bcrypt = require('bcryptjs');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');

module.exports = function(sequelize, DataTypes) {
		var user = sequelize.define('user', {
					email: {
						type: DataTypes.STRING,
						allowNull: false,
						unique: true,
						validate: {
							isEmail: true // Built in function from sequelize to check for valid emails
						}
					},
					
                    salt: {
						type: DataTypes.STRING
					},

					password_hash: {
						type: DataTypes.STRING
					},

					password: {
						type: DataTypes.VIRTUAL,
						allowNull: false,
						validate: {
							len: [7, 100]
						},

						set: function(value){

							var salt = bcrypt.genSaltSync(10);
							var hashedPassword = bcrypt.hashSync(value, salt);
							this.setDataValue('password', value);
							this.setDataValue('password_hash', hashedPassword);
							this.setDataValue('salt', salt);
						}

					}

				},
                     
					{
						hooks: {
							beforeValidate: function(user, options) {
								user.email = user.email.toLowerCase();
							}
						},

						classMethods: {
							authenticate: function(body){
								 return new Promise(function(resolve, reject){
                                 
                                 if (typeof body.email !== 'string' || typeof body.password !== 'string') {
						         return reject();
					             }

					             user.findOne({
						         where: {
							            'email': body.email
						                }
					             }).then(function(user) {

						         if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
							          return reject();
						         }

						         resolve(user);

					             }, function(e) {
						             return reject();
					             });

                                 })
							},

			           findByToken: function(token) {
					           return new Promise(function(resolve, reject) {

								try {

									var decodedJWT = jwt.verify(token, 'qwerty&&§');
									var bytes = cryptojs.AES.decrypt(decodedJWT.token, 'abc123@%%');
									var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));

									user.findById(tokenData.id).then(function(user) {
										if (!user) {
											reject();
										} else {
											resolve(user);
										}
									}, function(e) {
										return reject();
									});

								} catch (e) {
									console.log(e);
									reject();
								}

                         });

							}
						},

						instanceMethods: {
							toPublicJSON: function(){
								var json = this.toJSON();
								return _.pick(json,'id','email');
							},
							
							genToken: function(type){
								if(!_.isString(type)){
									return undefined;
								}

								try {
									var stringData = JSON.stringify({id: this.get('id'), type:type});
									var encryptedData = cryptojs.AES.encrypt(stringData,'abc123@%%');
									var token = jwt.sign({
										token: encryptedData
									}, 'qwerty&&§');

									return token;
								} catch (e) {
									console.log(e);
									return undefined;
								}

							}
						}
					});
		         return user;
				};