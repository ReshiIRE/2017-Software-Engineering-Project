Template.accountForm.events({
	'submit form' : function(event)
	{
		// submit the account form
		// Two seperate templates were made
		// so that the submit form function would work correctly

		// just get the values from the form submitted
		var emailVar = Meteor.user().emails[0].address.value;
		var nameVar = Meteor.user().profile.student.value;
		var textVar = event.target.emailTextAccount.value;
		var emailTopic = "Email sent from student " + nameVar + "."
		// send email
		Meteor.call('sendEmail', 'blackmagemario@gmail.com', emailVar, emailTopic, textVar);
		event.target.reset();
	}
});

Template.contactUs.events(
{
	'submit form' : function(event)
	{
		// exact same as above except for a different template
		// and also it allows you to siubmit your email and name
		// since this is the version for people without user account
		event.preventDefault();
		var emailVar = event.target.registerEmail.value;
		var nameVar = event.target.nameEmail.value;
		var textVar = event.target.emailText.value;
		var emailTopic = "Email sent from " + nameVar + "."
		Meteor.call('sendEmail', 'e.hannon11@nuigalway.ie', emailVar, emailTopic, textVar);
		event.target.reset();
	}
})