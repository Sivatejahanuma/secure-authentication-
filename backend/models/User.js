const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide a valid email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address',
      ],
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a secure password'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false, // Prevents password from being returned in standard queries
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: Hash password securely with bcrypt before storing
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to verify candidate password against bcrypt hash
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Ensure password and internal fields are stripped when converting to JSON or Object
const sanitizeTransform = (doc, ret) => {
  delete ret.password;
  delete ret.__v;
  return ret;
};

userSchema.set('toJSON', { transform: sanitizeTransform });
userSchema.set('toObject', { transform: sanitizeTransform });

const User = mongoose.model('User', userSchema);

module.exports = User;
