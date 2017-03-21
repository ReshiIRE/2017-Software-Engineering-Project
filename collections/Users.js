Users = new Mongo.Collection('Users');

console.log(Users.find().count());