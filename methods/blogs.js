

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
		var text = "A new blog was made by " + author + " at " + date + ". Here is the link to the blog: http://danu7.it.nuigalway.ie:8626/"+blog.id;
		/*Users.find({}).map(function(user){
			Meteor.call('sendEmail', user.emails.[0].address, 'blackmagemario@gmail.com', topic, text);
		})*/
		Meteor.call('sendEmail', "blackmagemario@gmail.com", "blackmagemario@gmail.com", topic, text);
		return blog;
	}
});