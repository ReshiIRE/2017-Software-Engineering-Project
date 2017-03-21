import { Meteor } from 'meteor/meteor';

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
	'insertComment' : function(comment)
	{
		Comments.insert(
		{
			comment: comment,
			date: new Date(),
			createdBy: this.userId,

		},
		function(error, result)
		{
			if(error) console.log(error);
			if(result) console.log(result);
		});
	}
});
Meteor.publish('userPosts', function(){
	return Comments.find();
});