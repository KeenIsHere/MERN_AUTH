import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
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
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookings',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: true,
        trim: true
    },
    images: [{
        type: String
    }],
    categories: {
        serviceQuality: {
            type: Number,
            min: 1,
            max: 5
        },
        valueForMoney: {
            type: Number,
            min: 1,
            max: 5
        },
        cleanliness: {
            type: Number,
            min: 1,
            max: 5
        },
        amenities: {
            type: Number,
            min: 1,
            max: 5
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    adminResponse: {
        type: String,
        default: ''
    },
    respondedAt: {
        type: Date
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// Indexes
feedbackSchema.index({ packageId: 1, status: 1 });
feedbackSchema.index({ userId: 1 });
feedbackSchema.index({ rating: 1 });
feedbackSchema.index({ createdAt: -1 });

const feedbackModel = mongoose.models.feedback || mongoose.model('feedbacks', feedbackSchema);

export default feedbackModel;
