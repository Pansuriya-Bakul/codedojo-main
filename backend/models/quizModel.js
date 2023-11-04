import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    learningPathId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "LearningPath"
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true,
        default: []
    }
}, {
    timestamps: true
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;