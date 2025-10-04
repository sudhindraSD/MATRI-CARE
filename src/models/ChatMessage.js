import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true
    },
    response: {
      type: String,
      required: [true, 'Response is required'],
      trim: true
    },
    intent: {
      type: String,
      trim: true
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1
    },
    context: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    },
    sentiment: {
      type: String,
      enum: ['positive', 'neutral', 'negative', 'urgent']
    },
    tags: [{
      type: String,
      trim: true
    }],
    isUrgent: {
      type: Boolean,
      default: false
    },
    flaggedForReview: {
      type: Boolean,
      default: false
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewNotes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Create indexes
chatMessageSchema.index({ user: 1, createdAt: -1 });
chatMessageSchema.index({ isUrgent: 1, flaggedForReview: 1 });
chatMessageSchema.index({ tags: 1 });

// Text index for search
chatMessageSchema.index({ message: 'text', response: 'text' });

export default mongoose.model('ChatMessage', chatMessageSchema);
