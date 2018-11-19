const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  articleId: { type: Schema.Types.ObjectId, ref: "Article" },
  comment: String,
  timestamp: Date
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment