import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.dashboard.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
	}
})