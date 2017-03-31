import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

Meteor.startup(function (){
	// to use email, we need to set the MAIL_URL to something
  	process.env.MAIL_URL = "smtp://mailrelay-dmz.it.nuigalway.ie";
});

Accounts.onCreateUser(function(options, user)
{
	// creates the user
	// this is extended if the user profile's is undefined
	// to allow us to extend it with the needed information
		if(user.profile == undefined) user.profile = {};
		_.extend(user.profile, { school: options.school, student: options.student, 
			phone: options.phone, needs: options.needs, permission: options.permission});
		
		return user;
});

Meteor.methods(
{
	'insertComment' : function(comment, blogPost)
	{
		Comments.insert(
		{
			// creates a new comment
			// amnd tells it which user created it
			// and which blog post it's attached to
			comment: comment,
			date: new Date(),
			createdBy: this.userId,
			blogPost: Blogs.findOne({_id: blogPost})._id
		},
		function(error, result)
		{
			if(error) console.log(error);
			if(result) console.log(result);
		});
	},

	'updateComment' : function(commentObj)
	{
		Comments.update({_id:commentObj.id}, {$set: {comment: commentObj.comment}});
	},

	'sendEmail': function (to, from, subject, text) {
		// sends an email.
    	check([to, from, subject, text], [String]);// check if these are all of the
    	// correct type
    	this.unblock();
    	Email.send({
      		to: to,
      		from: from,
      		subject: subject,
      		text: text
    	});
  	}
});
// below are publishes needed
// for the client to get certain information
Meteor.publish('userPosts', function(){
	return Comments.find();
});

Meteor.publish('allBlogs', function()
{
	return Blogs.find();
});

Meteor.publish('singleBlog', function(id)
{
	return Blogs.find(id);
});

Meteor.publish('singleUser', function(id)
{
	return Meteor.users.find(id);
});