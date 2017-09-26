var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');
	
module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://priyank:fwrk@ds141274.mlab.com:41274/first_mdb',
		port: process.env.PORT || 8080
	},
	// production: {
	// 	rootPath: rootPath,
	// 	db: 'mongodb://testfwrk:testfwrk@ds147842.mlab.com:47842/fwrk' || 'you can add a mongolab uri here ($ heroku config | grep MONGOLAB_URI)',
	// 	port: process.env.PORT || 80
	// }
};