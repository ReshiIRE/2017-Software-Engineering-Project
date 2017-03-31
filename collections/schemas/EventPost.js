// Event schema

var eventFields = {
	title: {
		type: String,
		label: 'Title of the event.'
	},
	startDate: {
		type: String,
		label: 'The date the event starts.'
	},
	endDate:
	{
		type: String, 
		label: 'The date the event ends.'
	},
	type:{
		type: String,
		label: 'The type of the event?',
		allowedValues: ['Lab', 'Student Meetup', 'Parent Meetup', 'Miscellaneous']
		// using allowed values means that only those values
		// are accepted as event types
	},
	guests: {
		type: Number,
		label: 'Number of people expected.'
	}
};

EventSchema = new SimpleSchema(eventFields);