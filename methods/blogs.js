Meteor.methods(
{
	// meteor methods for the blog
	submitBlog: function(blog)
	{
		// submit the blog
		var additionalParams = {
			//adition paramaters not set but needed
			// for the blog
			author: 'Author',
			createdAt: new Date()
		}
		// extend the blog, much like the user account, with these needed paramaters
		_.extend(blog, additionalParams);
		blog._id = Blogs.insert(blog);
		// below is needed for the email
		var author = 'Author';
		var date = new Date();
		var topic = "New Blog created by " + author + " at " + date;
		var text = "A new blog was made by " + author + " at " + date + ". Here is the link to the blog: http://danu7.it.nuigalway.ie:8626/"+blog._id;
		Meteor.users.find({}).map(function(user)
		{
			// depending on whether hte user uses a service like facebook or not
			// we need a different way of finding the email
			if(user.services)
			{
				if(user.services.facebook)
				{
					Meteor.call('sendEmail', user.services.facebook.email, 'e.hannon11@nuigalway.ie', topic, text);
				}
				if(user.services.twitter)
				{
					Meteor.call('sendEmail', user.services.twitter.email, 'e.hannon11@nuigalway.ie', topic, text);
				}
				if(user.services.google)
				{
					Meteor.call('sendEmail', user.services.google.email, 'e.hannon11@nuigalway.ie', topic, text);
				}
			}
			else
			{
				Meteor.call('sendEmail', user.emails[0].address, 'e.hannon11@nuigalway.ie', topic, text);
			}
			
		});
		// finally return blog
		return blog;
	}
});