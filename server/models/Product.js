import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
    title: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    post: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product"},
}, {timestamps: true})

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    rating: {type: Number, required: true},
    numberOfReviews: {type: Number, required: true},
    productIsNew: {type: Boolean, default: true},
    reviews: [reviewSchema],
    stock: {type: Number, required: true, default: 0},
}, {timestamps: true})

const Product = mongoose.model('Products', productSchema);

export default Product;
