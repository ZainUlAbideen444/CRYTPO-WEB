// models/Portfolio.js — User's crypto holdings
const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema(
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
      // CoinGecko ID (e.g. "bitcoin", "ethereum") — used for price lookups
      type: String,
      required: true,
      lowercase: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be negative'],
    },
    averageBuyPrice: {
      // Weighted average of all buy orders for this coin
      type: Number,
      required: true,
      min: [0, 'Average buy price cannot be negative'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Compound index: one document per user+coin pair ──────────────────────────
PortfolioSchema.index({ userId: 1, coinSymbol: 1 }, { unique: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
