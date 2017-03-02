import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './Navbar.html';

Template.navbar.events(
{
	toggle: function(){
	this.$.collapse.toggle();
	}
});
