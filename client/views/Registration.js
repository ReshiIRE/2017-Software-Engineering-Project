import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './Registration.html';

Template.register.events({
	'submit form': function(event)
	{
		event.preventDefault();
		var email = event.target.registerEmail.value;
		var password = event.target.registerPassword.value;
		var school = event.target.registerSchool.value;
		Accounts.createUser({email: email, password: password, school: school},
			function(error)
			{
				if(error)
				{
					console.log("ayy lmao");
				}
				else
				{
					Router.go('/');
				}
			});
		return false;
	}
});


Template.login.events({
	'submit form' : function(event)
	{
		event.preventDefault();
		var emailVar = event.target.loginEmail.value;
		var passwordVar = event.target.loginPassword.value;
		console.log("Form submitted");
		Meteor.loginWithPassword(emailVar, passwordVar);
	}
});