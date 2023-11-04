import express from 'express';
import { 
    getLearningPaths, 
    getLearningPathById, 
    getCoursesForLearningPath, 
    getCourseById, 
    getQuizzesForCourse, 
    createLearningPath,
    updateLearningPath,
    deleteLearningPath,
    createCourse,
    updateCourse,
    deleteCourse,
    createLearningPathReview
} from '../controllers/productController.js';
import {protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getLearningPaths).post(protect, admin, createLearningPath);

router.route('/:learningPathId').get(getLearningPathById).put(protect, admin, updateLearningPath).delete(protect, admin, deleteLearningPath);

router.route('/:learningPathId/courses').get(getCoursesForLearningPath).post(protect, admin, createCourse);

router.route('/:learningPathId/courses/:courseId').get(getCourseById).put(protect, admin, updateCourse).delete(protect, admin, deleteCourse);

router.route('/:learningPathId/courses/:courseId/quizzes').get(getQuizzesForCourse);

router.route('/:learningPathId/reviews').post(protect, createLearningPathReview);

export default router;