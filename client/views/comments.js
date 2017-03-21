Template.comments.helpers({
	charsRemaining: function()
	{
		return Session.get('CharactersRemaining');
	},
	comments : function(){
		return comments.find({}, {sort: {date: -1}});
	},
	timeDiff : function(postDate)
	{
		var timeDiff = new Date().getTime() - postDate.getTime();
		var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
		var diffHours = Math.floor(timeDiff / (1000 * 3600));
		var diffMins = Math.floor(timeDiff / (1000 * 60));
		var diffSecs = Math.floor(timeDiff / (1000));

		if(diffDays > 0)
			return ("about " + diffDays + "d ago");
		else if(diffHours > 0)
			return("about" + diffHours + "h ago");
		else if(diffMins > 0)
			return(diffMins + "m ago");
		else
			return(diffSecs + "s ago");	
	}
});

Template.comments.onRendered(function() {
	$("#postComment").validate();
});

Template.comments.events({
	'keyup #inputComment': function(event)
	{
		var inputText = event.target.value;
		Session.set("CharactersRemaining", (140-inputText.length) + " characters remaining");
	},
	'submit #postComment': function(event)
	{
		event.preventDefault();
		var comment = event.target.inputPost.value;
		event.target.reset();
		Session.set("CharactersRemaining", 140 + " characters remaining");
		Meteor.call('insertComment', comment);
	}
});

Meteor.subscribe('userPosts');