UserPageController = RouteController.extend(
{
	layoutTemplate: 'userPage',

	template: 'singleUserPage',

	waitOn: function()
	{
		//console.log("Client Side:" + Meteor.userId());
		return Meteor.subscribe('singleUser', Meteor.userId());
	},

	data: function()
	{
		console.log("Let's print this value: " + Users.find({id: Meteor.userId()}));
		return Users.find({id: Meteor.userId()});
	}

});