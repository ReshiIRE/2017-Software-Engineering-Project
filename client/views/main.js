import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.data.helpers({
	Users: function (){
		return Users.find();
	},
});

Template.data.events({
	'click #delete' : function(event, instance)
	{
		Users.remove(this._id);
	}
});
Template.dashboard.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
	}
})