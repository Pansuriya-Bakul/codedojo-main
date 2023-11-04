import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import learningPaths from "./data/learningPaths.js";
import courses from "./data/courses.js";
import quizzes from "./data/quizzes.js"
import User from "./models/userModel.js";
import LearningPath from "./models/learningPathModel.js";
import Course from "./models/courseModel.js";
import Quiz from "./models/quizModel.js"
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const ImportData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await LearningPath.deleteMany();
        await Course.deleteMany();
        await Quiz.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleLearningPaths = learningPaths.map((learningPath) => {
            return { ...learningPath, userId: adminUser };
        });

        const createdLearningPaths = await LearningPath.insertMany(sampleLearningPaths);

        const learningPath = createdLearningPaths[0]._id;

        const sampleCourses = courses.map((course) => {
            return { ...course, userId: adminUser, learningPathId: learningPath  };
        });

        const createdCourses = await Course.insertMany(sampleCourses);

        const course = createdCourses[0]._id;

        const sampleQuizzes = quizzes.map((quiz) => {
            return { ...quiz, userId: adminUser, learningPathId: learningPath, courseId: course };
        })

        await Quiz.insertMany(sampleQuizzes)

        console.log('Data Imported');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await LearningPath.deleteMany();
        await Course.deleteMany();
        await Quiz.deleteMany();

        console.log('Data Destroyed');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if(process.argv[2] === '-d'){
    destroyData();
} else{
    ImportData();
}