Blogs = new Mongo.Collection('blogs');
Blogs.attachSchema(BlogSchema);
console.log("Blogs count: " + Blogs.find().count());