import mongoose from 'mongoose';

const calendarEventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Please add an event title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    eventType: {
      type: String,
      enum: [
        'appointment',
        'medication',
        'checkup',
        'ultrasound',
        'lab_test',
        'vaccination',
        'reminder',
        'other'
      ],
      default: 'reminder'
    },
    startDate: {
      type: Date,
      required: [true, 'Please add a start date']
    },
    endDate: {
      type: Date
    },
    location: {
      type: String,
      trim: true
    },
    isAllDay: {
      type: Boolean,
      default: false
    },
    reminder: {
      enabled: {
        type: Boolean,
        default: true
      },
      minutesBefore: {
        type: Number,
        default: 30
      }
    },
    recurrence: {
      enabled: {
        type: Boolean,
        default: false
      },
      frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
      },
      interval: {
        type: Number,
        default: 1
      },
      endDate: Date
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'missed'],
      default: 'scheduled'
    },
    notes: {
      type: String,
      trim: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create indexes for efficient querying
calendarEventSchema.index({ user: 1, startDate: 1 });
calendarEventSchema.index({ user: 1, eventType: 1 });
calendarEventSchema.index({ startDate: 1, endDate: 1 });
calendarEventSchema.index({ status: 1 });

// Virtual for event duration in minutes
calendarEventSchema.virtual('durationMinutes').get(function() {
  if (this.endDate && this.startDate) {
    return Math.round((this.endDate - this.startDate) / (1000 * 60));
  }
  return null;
});

// Pre-save middleware to validate dates
calendarEventSchema.pre('save', function(next) {
  if (this.endDate && this.startDate && this.endDate < this.startDate) {
    next(new Error('End date must be after start date'));
  }
  next();
});

export default mongoose.model('CalendarEvent', calendarEventSchema);
