import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'packages',
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    travelDate: {
        type: Date,
        required: true
    },
    numberOfPersons: {
        adults: {
            type: Number,
            required: true,
            min: 1
        },
        children: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed', 'refunded'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    contactDetails: {
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        alternatePhone: String
    },
    specialRequests: {
        type: String,
        default: ''
    },
    cancellationReason: {
        type: String,
        default: ''
    },
    cancelledAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Indexes for efficient queries
bookingSchema.index({ userId: 1, bookingDate: -1 });
bookingSchema.index({ packageId: 1 });
bookingSchema.index({ bookingStatus: 1 });
bookingSchema.index({ travelDate: 1 });

const bookingModel = mongoose.models.booking || mongoose.model('bookings', bookingSchema);

export default bookingModel;
