BaseController = RouteController.extend({
	layoutTemplate: 'blog'
});

MainBlogController = BaseController.extend(
{
	template: 'blogList',

	findOption: function(){
		return {sort: {createdAt: -1}};
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
		Session.set('blogPost', this.params._id);
		return Blogs.findOne(this.params._id);
	}
})