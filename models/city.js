'use strict';

const mongoose = require('mongoose');

const cityschema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    CO2: {
      type: Number
    },
    squareMeter: {
      type: Number
    },
    location: {
      type: {
        type: String
        //default: 'Point'
      },
      coordinates: [
        {
          type: Number,
          min: -180,
          max: 180
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('City', cityschema);
