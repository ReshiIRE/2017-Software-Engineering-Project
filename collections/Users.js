Users = new Mongo.Collection('Users');

console.log("Number of users: " + Users.find().count());