import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './navbar.html';

Template.navbar.events(
{
	// just a simple toggle for the navbar
	toggle: function(){
	this.$.collapse.toggle();
	}
});
