import mongoose from 'mongoose';

const querySchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
    trim: true
  },
  response: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    default: 'anonymous'
  },
  category: {
    type: String,
    enum: ['general', 'appointment', 'technical', 'information', 'other'],
    default: 'general'
  },
  confidence: {
    type: Number,
    min: 0,
    max: 1,
    default: 0.5
  },
  metadata: {
    source: String,
    responseTime: Number,
    model: String
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient searching
querySchema.index({ query: 'text', response: 'text' });
querySchema.index({ userId: 1, createdAt: -1 });

const Query = mongoose.model('Query', querySchema);

export default Query;