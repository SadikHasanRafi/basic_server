import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [100, "Name must be less than 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v: string) {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props: { value: string }) => `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  phone: {
    type: String,
    validate: {
      validator: function (v: string) {
        return /^\+?[0-9]{7,15}$/.test(v);
      },
      message: (props: { value: string }) => `${props.value} is not a valid phone number`,
    },
  },
  image: {
    type: String,
    validate: {
      validator: function (v: string) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)$/i.test(v);
      },
      message: (props: { value: string }) => `${props.value} is not a valid image URL`,
    },
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true },
  },
  role: {
    type: String,
    enum: ["admin", "customer"],
    required: [true, "Role is required"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, 
});

export const User = mongoose.model("User", UserSchema);
// export const User = mongoose.models.User || mongoose.model("User", UserSchema);
