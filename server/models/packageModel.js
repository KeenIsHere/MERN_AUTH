import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    duration: {
        days: {
            type: Number,
            required: true
        },
        nights: {
            type: Number,
            required: true
        }
    },
    availability: {
        type: Boolean,
        default: true
    },
    maxCapacity: {
        type: Number,
        default: 50
    },
    images: [{
        type: String
    }],
    inclusions: [{
        type: String
    }],
    exclusions: [{
        type: String
    }],
    itinerary: [{
        day: Number,
        title: String,
        description: String,
        activities: [String]
    }],
    category: {
        type: String,
        enum: ['adventure', 'family', 'honeymoon', 'pilgrimage', 'beach', 'wildlife', 'cultural', 'luxury', 'budget'],
        default: 'family'
    },
    difficulty: {
        type: String,
        enum: ['easy', 'moderate', 'difficult'],
        default: 'easy'
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    startDates: [{
        type: Date
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'archived'],
        default: 'active'
    }
}, {
    timestamps: true
});

// Index for search optimization
packageSchema.index({ title: 'text', description: 'text', destination: 'text' });
packageSchema.index({ category: 1, availability: 1 });
packageSchema.index({ price: 1 });

const packageModel = mongoose.models.package || mongoose.model('packages', packageSchema);

export default packageModel;
