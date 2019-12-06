const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 140,
      minlength: 1
    },
    city: {
      type: mongoose.Types.ObjectId,
      ref: 'City'
    },
    squareMeter: {
      type: Number
    },
    stage: {
      type: String,
      enum: ['Proposed', 'Building', 'Active'],
      default: 'Proposed'
    },
    location: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updateDate'
    }
  }
);

const Projects = mongoose.model('Project', projectSchema);

module.exports = Projects;
