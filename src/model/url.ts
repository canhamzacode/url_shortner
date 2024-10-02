import mongoose from 'mongoose';

const shortenedURLSchema = new mongoose.Schema(
  {
    customName: {
      type: String,
      unique: true,
      sparse: true
    },
    shortUrl: {
      type: String,
      required: false,
      unique: true
    },
    originalUrl: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

export default mongoose.model('URL', shortenedURLSchema);
