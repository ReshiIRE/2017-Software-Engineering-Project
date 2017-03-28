import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './registration.html';

Template.register.events({
	'submit form': function(event)
	{
		event.preventDefault();
		var email = event.target.registerEmail.value;
		var password = event.target.registerPassword.value;
		var school = event.target.registerSchool.value;
		var student = event.target.registerStudent.value;
		var phone = event.target.registerPhoneNumber.value;
		var needs = event.target.registerNeeds.value;
		var permission = event.target.registerPermission.value;
		Accounts.createUser({email: email, password: password, school: school, student: student, phone: phone, needs: needs, permission: permission},
			function(error)
			{
				if(error)
				{
					console.log("Error: " + error);
				}
				else
				{
					Router.go('/');
				}
			});
		return false;
	}
});

Template.registerCustomService.events({
	'submit form': function(event)
	{
		event.preventDefault();
		var school = event.target.registerSchool.value;
		var student = event.target.registerStudent.value;
		var phone = event.target.registerPhoneNumber.value;
		var needs = event.target.registerNeeds.value;
		var permission = event.target.registerPermission.value;
		Meteor.users.update(Meteor.userId(), {$set:
			{'profile.school': school, 'profile.student': student, 'profile.phone': phone, 'profile.needs': needs, 'profile.permission': permission}},
			function(error)
			{
				if(error)
				{
					console.log("Error: " + error);
				}
				else
				{
					Router.go('/');
				}
			});
		return false;
	}
})


Template.login.events({
	'click a#loginFacebook': function(event)
	{
		Meteor.loginWithFacebook({requestPermissions: ['email']},
		function(error)
		{
			if(error)
			{
				return console.log("There was an error: " + error.reason);
			}
			else if(Meteor.user().profile.student == null ||
				Meteor.user().profile.school == null ||
				Meteor.user().profile.needs == null ||
				Meteor.user().profile.permission==null ||
				Meteor.user().profile.phone == null)
			{
				Router.go('registerCustomService');
			}
		});
	},
	'click a#loginGoogle': function(event)
	{
		Meteor.loginWithGoogle({requestPermissions: ['email']},
		function(error)
		{
			if(error)
			{
				return console.log("There was an error: " + error.reason);
			}
			else if(Meteor.user().profile.student == null ||
				Meteor.user().profile.school == null ||
				Meteor.user().profile.needs == null ||
				Meteor.user().profile.permission==null ||
				Meteor.user().profile.phone == null)
			{
				Router.go('registerCustomService');
			}
		});
	},
	'click a#loginTwitter': function(event)
	{
		Meteor.loginWithTwitter({requestPermissions: ['email']},
		function(error)
		{
			if(error)
			{
				return console.log("There was an error: " + error.reason);
			}
			else if(Meteor.user().profile.student == null ||
				Meteor.user().profile.school == null ||
				Meteor.user().profile.needs == null ||
				Meteor.user().profile.permission==null ||
				Meteor.user().profile.phone == null)
			{
				Router.go('registerCustomService');
			}
		});
	},
	'submit form' : function(event)
	{
		event.preventDefault();
		var emailVar = event.target.loginEmail.value;
		var passwordVar = event.target.loginPassword.value;
		console.log("Form submitted");
		Meteor.loginWithPassword(emailVar, passwordVar,
		function(err) {
			console.log("Function is being called");
			if(err)
			{
				console.log("Error");
			}
			else
			{
				console.log("Success");
			}
		});
	}
});