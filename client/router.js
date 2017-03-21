Router.configure(
{
	layoutTemplate: 'main',
	layoutTemplate: 'Registration'
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
Router.route('/aboutUs', function(){
	this.render('navbar', {to: "navigation"});
	this.render('aboutUs', {to: "top"});
	this.layout('main');
},
{
	name:"aboutUs"
}
);
Router.route('/contactUs', function(){
	this.render('navbar', {to: "navigation"});
	this.render('contactUs', {to: "top"});
	this.layout('main');
},
{
	name:"contactUs"
}
);
Router.route('/findUs', function(){
	this.render('navbar', {to: "navigation"});
	this.render('findUs', {to: "top"});
	this.layout('main');
},
{
	name:"findUs"
}
);
Router.route('/registration', function(){
	this.render('navbar', {to: "regNav"});
	this.render('data', {to: "regTop"});
	this.render('register', {to: "regAdd"});
	this.layout('Registration');
},
{
	name:"Registration"
});
Router.route('/comments', function(){
	this.render('navbar', {to: "navigation"});
	this.render('comments', {to: "top"});
	this.layout('main');
},
{
	name:"comments"
});