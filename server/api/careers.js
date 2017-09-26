var Career = require('../models/careers');

// Posts API
module.exports = function(apiRouter,upload){
	// get all posts
	apiRouter.get('/careers', function(req, res){
		Career.find({}, function(err, careers){
			if (err) res.send(err);
			res.json(careers);
		});
	});
	//
	apiRouter.post('/uploadimage',upload.array('file',3), function(req, res, next) {
       // console.log(req.body);
        console.log(req.files);
        res.send(req.files);
    });

	// add a post
	apiRouter.post('/careers', function(req, res){
		var post = new Career();
		post.name = req.body.name;
		post.file = req.body.file;
		post.email =req.body.email;
		post.phone1 = req.body.phone1;
		post.phone2 =req.body.phone2;
		post.cover_letter = req.body.cover_letter;
		post.position = req.body.position;
		console.log(req.body)
	//	post.description = req.body.description;
 		post.save(function(err, post){
			if(err) res.send(err);
				res.json(post);
			})
	});

	// get a single post
	apiRouter.get('/posts/:id', function(req, res){
		Post.findById(req.params.id, function(err, post){
			if (err) res.send(err);

			res.json(post);
		});
	});
        // get a single post
	apiRouter.post('/parmal_cat', function(req, res){
        console.log(req.body.path)
		Category.findOne({'_id':req.body.path}, function(err, post){
			if (err) return res.send(err);
console.log(post)
			res.json(post);
		});
	});
//        

	// update a post
	apiRouter.post('/editparmal', function(req, res){
                //console.log(req.body);
		Post.findById({'_id':req.body.id}, function(err, post){
			if(err) res.send(err);
		post.title = req.body.title;
                post.description = req.body.description;
                post.simage = req.body.simage;
                post.himage = req.body.himage;
                post.paramal = req.body.paramal;
                post.metadescription = req.body.metadescription;
                post.metakeywords = req.body.metakeywords;
			post.save(function(err){
				if(err) res.send(err);
				res.json({ message: 'Post updated!' });
			})
		});
	});
	// delete a post
	apiRouter.post('/deleterequest', function(req, res){
		Career.remove({
			_id: req.body.id
		}, function(err, post){
			if(err) res.send(err);
			res.json({ message: 'Request deleted!' });
		})
	});
};