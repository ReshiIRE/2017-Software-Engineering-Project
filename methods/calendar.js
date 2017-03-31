Meteor.methods({
	addEvent(event)
	{
		// add an event to the calendar
		check(event, {title: String, startDate: String, endDate: String, type: String, guests: Number});
		try {
			return Events.insert(event);
		} catch(exception)
		{
			throw new Meteor.Error('500', '${exception}');
		}
	},

	editEvent(event)
	{
		check(event, {_id: String, title: Match.Optional(String), startDate: String, endDate: String, type: match.Optional(String), guests: match.Optional(Number)});
		try {
			return Events.update(events._id, { $set: event});
		}
		catch (exception)
		{
			throw new Meteor.Error('500', '${exception}');
		}
	},
	removeEvent(event){
		check(event, String);

		try {
			return Events.remove(event);
		} catch (exception)
		{
			throw new Meteor.Error('500', '${ exception }');
		}
	}
});