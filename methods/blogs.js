Meteor.methods(
{
	submitBlog: function(blog)
	{
		console.log(blog);
		var additionalParams = {
			author: 'Author',
			createdAt: new Date()
		}
		_.extend(blog, additionalParams);
		blog._id = Blogs.insert(blog);
		var author = 'Author';
		var date = new Date();
		var topic = "New Blog created by " + author + " at " + date;
		var text = "A new blog was made by " + author + " at " + date + ". Here is the link to the blog: http://danu7.it.nuigalway.ie:8626/"+blog._id;
		Meteor.users.find({}).map(function(user)
		{
			Meteor.call('sendEmail', user.emails[0].address, 'e.hannon11@nuigalway.ie', topic, text);
		});
		return blog;
	}
});