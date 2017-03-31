// heavily based off Enda's Notes - but with modifications, of course!

Template.comments.helpers({
	charRemaining: function()
	{
		return Session.get('CharactersRemaining');//we need the characters remaining
		// so that the user knows how much characters they've used
	},
	Comments : function(){
		// we get this so that we know what blog post
		// the comment is from
		// we sort it by first comment first
		return Comments.find({blogPost: Session.get('blogPost')}, {sort: {date: -1}});
	},
	timeDiff : function(postDate)
	{
		// this is to get the time difference
		// Note: From what I have read, it is either Meteor or Javascript that
		// has some issues with the Date() constructor
		// this means that Date() is actually a few seconds off
		// depending on your connection to the server
		var timeDiff = new Date().getTime() - postDate.getTime();
		var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
		var diffHours = Math.floor(timeDiff / (1000 * 3600));
		var diffMins = Math.floor(timeDiff / (1000 * 60));
		var diffSecs = Math.floor(timeDiff / (1000));

		if(diffDays > 0)
			return ("about " + diffDays + "d ago");
		else if(diffHours > 0)
			return("about " + diffHours + "h ago");
		else if(diffMins > 0)
			return(diffMins + "m ago");
		else
			return(diffSecs + "s ago");	
	},
	checked : function(users)
	{
		// for the checkbox
		if($.inArray(Meteor.userId(), users) > -1)
			return true;
		else
			return false;
	},
	userCreated : function(createdBy)
	{
		// check if the user created this comment
		if(createdBy == Meteor.userId())
			return true;
		else
			return false;
	}
});

Template.comments.onRendered(function() {
	// validation for when a comment is posted
	$("#postComment").validate();
});

Template.comments.events({
	// keyup is called everytime a key is pressed (or an input is detected)
	// in the #inputComment textarea
	// this allows is to very easily calculate how many characters
	// are remaining
	'keyup #inputComment': function(event)
	{
		var inputText = event.target.value;
		Session.set("CharactersRemaining", (140-inputText.length) + " characters remaining");
	},
	'submit #postComment': function(event)
	{
		// posts the comment
		event.preventDefault();
		var comment = event.target.inputComment.value;
		var BlogID = Session.get('blogPost');
		event.target.reset();
		Session.set("CharactersRemaining", 140 + " characters remaining");
		Meteor.call('insertComment', comment, BlogID);
	},
	'click #editCommentCheckbox' : function(event)
	{
		// clicking this checkbox will allow the comment to be edited
		if(event.target.checked)
		{
			$("#edit"+this._id).removeClass("hidden");
			$("#comment"+this._id).hide();
		}
		else
		{
			var comment = $("#edit"+this._id).val();
			Meteor.call('updateComment', {id:this._id,comment:comment});
			$("#edit"+this._id).addClass("hidden");
			$('#comment'+this._id).show();
		}
	}
});
Meteor.subscribe('userPosts');