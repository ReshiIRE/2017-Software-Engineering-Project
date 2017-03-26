import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

Meteor.startup(() => {
  // code to run on server at startup
});

Accounts.onCreateUser(function(options, user)
{
		if(user.profile == undefined) user.profile = {};
		_.extend(user.profile, { school: options.school});
		
		return user;
});

Meteor.methods(
{
	'insertComment' : function(comment, blogPost)
	{
		Comments.insert(
		{
			comment: comment,
			date: new Date(),
			createdBy: this.userId,
			blogPost: Blogs.findOne({_id: blogPost})._id
		},
		function(error, result)
		{
			//console.log("Blog id: " + Blogs.findOne({_id: BlogID})._id);
			if(error) console.log(error);
			if(result) console.log(result);
		});
	},

	'updateComment' : function(commentObj)
	{
		Comments.update({_id:commentObj.id}, {$set: {comment: commentObj.comment}});
	}
});
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
	//console.log("Server side: " + Users.find(id))
	return Users.find(id);
});