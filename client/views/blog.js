BaseController = RouteController.extend({
	// controllers were used with the blog due to it's complexity
	// and the calls needed
	// three are set up: one as a base that the other controllers can
	// extend off of; and two others: one for the main blog page
	// and one for a single blog post.
	layoutTemplate: 'blog'
});

MainBlogController = BaseController.extend(
{
	template: 'blogList',

	findOption: function(){
		return {sort: {createdAt: -1}};// this sorts the blog so that the latest
		// blog goes to the top
	},

	waitOn: function()
	{
		return Meteor.subscribe('allBlogs', this.findOption());
	},

	data: function()
	{
		return { blogs: Blogs.find({}, {sort: {createdAt: -1}})};
	}
});

SingleBlogController = BaseController.extend(
{
	template: 'blogPage',

	waitOn: function(){
		return Meteor.subscribe('singleBlog', this.params._id);
	},

	data: function()
	{
		Session.set('blogPost', this.params._id);// we set this variable
		// so that only comments from this particular blog will show up
		// on the blog page
		return Blogs.findOne(this.params._id);
	}
})