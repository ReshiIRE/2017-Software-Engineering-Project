Router.configure(
{
	layoutTemplate: 'main',
	layoutTemplate: 'Registration'
});

Router.route('/User:_id',
{
	name: 'UserPage',
	controller: 'UserPageController'
});

Router.route('/imageGallery', function()
{
	this.render('navbar', {to: "navigation"});
	this.render('imageGallery', {to: "top"});
	this.layout('main');
},
{
	name: "imageGallery"
})

Router.route('/calendar', function()
{
	this.render('navbar', {to: "navigation"});
	this.render('calendar', {to: "top"});
	this.layout('main');
},
{
	name:"calendar"
});

Router.route('/', function(){
	this.render('navbar', {to: "navigation"});
	this.render('home', {to: "top"});
	this.layout('main');
},
{
	name:"home"
}
);
Router.route('/registerNow', function(){
	this.render('navbar', {to: "navigation"});
	this.render('registerNow', {to: "top"});
	this.layout('main');
},
{
	name:"registerNow"
});
Router.route('/aboutUs', function(){
	this.render('navbar', {to: "navigation"});
	this.render('aboutUs', {to: "top"});
	this.layout('main');
},
{
	name:"aboutUs"
}
);
Router.route('/registerCustomService', function()
{
	this.render('navbar', {to: "regNav"});
	this.render('registerCustomService', {to: "regAdd"});
	this.layout('Registration');

},
{
	name:"registerCustomService"
});
Router.route('/contactUs', function(){
	this.render('navbar', {to: "navigation"});
	this.render('contactUs', {to: "top"});
	this.layout('main');
},
{
	name:"contactUs"
}
);
Router.route('/camp', function(){
	this.render('navbar', {to: "navigation"});
	this.render('camp', {to: "top"});
	this.layout('main');
},
{
	name:"camp"
}
);
Router.route('/registration', function(){
	this.render('navbar', {to: "regNav"});
	this.render('register', {to: "regAdd"});
	this.layout('Registration');
},
{
	name:"Registration"
});
Router.route('/new', {
	name: 'newBlog',
	controller: 'BaseController'
});

Router.route('/blog', {
	name: 'Blog',
	controller: 'MainBlogController'
})

Router.route('/:_id',
{
	name: 'singleBlog',
	controller: 'SingleBlogController'
});