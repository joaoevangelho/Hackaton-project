'use strict';

const mongoose = require('mongoose');

const cityschema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    co2: {
      type: Number
    },
    squareMeter: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('City', cityschema);
