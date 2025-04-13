import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Product name is required"], 
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [100, "Name must be less than 100 characters"]
  },
  brand: { 
    type: String, 
    required: [true, "Brand is required"],
    trim: true
  },
  model: { 
    type: String, 
    required: [true, "Model is required"],
    trim: true
  },
  price: { 
    type: Number, 
    required: [true, "Price is required"], 
    min: [0, "Price cannot be negative"] 
  },
  image: { 
    type: String,
    validate: {
      validator: function (v: string) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)$/i.test(v);
      },
      message: (props: { value: unknown; }) => `${props.value} is not a valid image URL`
    }
  },
  quantity: { 
    type: Number, 
    default: 1, 
    min: [0, "Quantity cannot be negative"] 
  },
  about: { 
    type: String, 
    maxlength: [500, "About section should not exceed 500 characters"] 
  }
});

export const Product = mongoose.model("Product", ProductSchema);
