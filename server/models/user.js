const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  slaps: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  articles: [ { type: Schema.Types.ObjectId, ref: 'Article' }],
  saves: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User