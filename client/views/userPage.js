UserPageController = RouteController.extend(
{
	// simple controller for basic user accounts
	// so that they can see their email and their student
	layoutTemplate: 'userPage',

	template: 'singleUserPage',

	waitOn: function()
	{
		return Meteor.subscribe('singleUser', Meteor.userId());
	},

	data: function()
	{
		return Meteor.users.find({id: Meteor.userId()});
	}

});