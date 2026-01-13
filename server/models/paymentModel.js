import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookings',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet', 'cash'],
        required: true
    },
    transactionId: {
        type: String,
        unique: true,
        sparse: true
    },
    paymentGatewayResponse: {
        type: Object,
        default: {}
    },
    status: {
        type: String,
        enum: ['initiated', 'pending', 'success', 'failed', 'refunded'],
        default: 'initiated'
    },
    paymentDate: {
        type: Date
    },
    refundAmount: {
        type: Number,
        default: 0
    },
    refundDate: {
        type: Date
    },
    refundTransactionId: {
        type: String
    },
    description: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Indexes
paymentSchema.index({ bookingId: 1 });
paymentSchema.index({ userId: 1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ status: 1 });

const paymentModel = mongoose.models.payment || mongoose.model('payments', paymentSchema);

export default paymentModel;
