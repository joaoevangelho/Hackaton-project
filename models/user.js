'use strict';

const mongoose = require('mongoose');

const userschema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userschema);
