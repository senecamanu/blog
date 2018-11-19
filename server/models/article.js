const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const articleSchema = new Schema({
  title: String,
  heading: String,
  content: String,
  image: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  slaps: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: Date
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article