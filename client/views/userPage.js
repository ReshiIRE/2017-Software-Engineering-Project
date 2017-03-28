UserPageController = RouteController.extend(
{
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