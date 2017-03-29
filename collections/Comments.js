Comments = new Mongo.Collection('Comments');

console.log("Comments count: " + Comments.find().count());