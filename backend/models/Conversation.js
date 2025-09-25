import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  messages: [{
    text: {
      type: String,
      required: true
    },
    isBot: {
      type: Boolean,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
conversationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;