Events = new Mongo.Collection('events');

Events.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Events.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

Events.attachSchema(EventSchema);
console.log("Events count " + Events.find().count())