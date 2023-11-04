import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const learningPathSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    learningPathSlug: {
        type: String,
        required: false
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0.0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0.0
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    courses: {
        type: Array,
        required: false,
        default: []
    }
}, {
    timestamps: true
});

const LearningPath = mongoose.model("LearningPath", learningPathSchema);

export default LearningPath;