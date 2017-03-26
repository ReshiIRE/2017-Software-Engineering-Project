Template.comments.helpers({
	charRemaining: function()
	{
		return Session.get('CharactersRemaining');
	},
	Comments : function(){
		//console.log("Is this called?");
		return Comments.find({blogPost: Session.get('blogPost')}, {sort: {date: -1}});
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
			return("about " + diffHours + "h ago");
		else if(diffMins > 0)
			return(diffMins + "m ago");
		else
			return(diffSecs + "s ago");	
	},
	checked : function(users)
	{
		//console.log("Is this called?");
		if($.inArray(Meteor.userId(), users) > -1)
			return true;
		else
			return false;
	},
	userCreated : function(createdBy)
	{
		if(createdBy == Meteor.userId())
			return true;
		else
			return false;
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
		var comment = event.target.inputComment.value;
		var BlogID = Session.get('blogPost');
		event.target.reset();
		Session.set("CharactersRemaining", 140 + " characters remaining");
		Meteor.call('insertComment', comment, BlogID);
	},
	'click #plsWork' : function(event)
	{
		//console.log("What about this one specifically?");
		if(event.target.checked)
		{
			//console.log("Well does this fire?")
			$("#edit"+this._id).removeClass("hidden");
			$("#comment"+this._id).hide();
		}
		else
		{
			//console.log("What about this one?");
			var comment = $("#edit"+this._id).val();
			Meteor.call('updateComment', {id:this._id,comment:comment});
			$("#edit"+this._id).addClass("hidden");
			$('#comment'+this._id).show();
		}
	}
});
Meteor.subscribe('userPosts');