// models/Transaction.js — Individual trade records
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coinSymbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    coinName: {
      type: String,
      required: true,
      trim: true,
    },
    coinId: {
      type: String,
      required: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: ['buy', 'sell'],
      required: true,
      lowercase: true,
    },
    price: {
      // Execution price at time of trade
      type: Number,
      required: true,
      min: [0, 'Price must be positive'],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0.000001, 'Quantity must be positive'],
    },
    total: {
      // price × quantity (in USDT)
      type: Number,
      required: true,
    },
    balanceBefore: {
      type: Number,
    },
    balanceAfter: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// ── Indexes for fast querying ─────────────────────────────────────────────────
TransactionSchema.index({ userId: 1, createdAt: -1 });
TransactionSchema.index({ userId: 1, coinSymbol: 1 });

module.exports = mongoose.model('Transaction', TransactionSchema);
