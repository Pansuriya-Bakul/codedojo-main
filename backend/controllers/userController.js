import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


// @desc        Register user
//@route        POST /api/users
//@access       Public
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        purchases: {
            learningPathId: 0
        }
    });

    if (user) {
        const token = req.cookies.jwt
        generateToken(res, user._id);
        res.status(201).json({
            userId: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            purchases: user.purchases,
            token: token
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc        Login user & get token
//@route        POST /api/users/login
//@access       Public
const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const token = req.cookies.jwt
        generateToken(res, user._id);
        res.status(200).json({
            userId: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            purchases: user.purchases,
            token: token
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc        Logout user & clear cookie
//@route        POST /api/users/logout
//@access       Private
const logoutUser = asyncHandler( async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' })
});

// @desc        Get user profile
//@route        GET /api/users/profile
//@access       Private
const getUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        const token = req.cookies.jwt
        res.status(200).json({
            userId: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            purchases: user.purchases,
            token: token
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc        Update user profile
//@route        PUT /api/users/profile
//@access       Private
const updateUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            userId: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            purchases: updatedUser.purchases
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc        Get users
//@route        GET /api/users
//@access       Private/Admin
const getUsers = asyncHandler( async (req, res) => {
   const users = await User.find({});
   res.status(200).json(users);
});

// @desc        Get user by ID
//@route        GET /api/users/:userId
//@access       Private/Admin
const getUserById = asyncHandler( async (req, res) => {
   const user = await User.findById(req.params.userId).select('-password');
   if (user) {
    res.status(200).json(user);
   } else {
    res.status(404);
    throw new Error('User not found');
   }
});

// @desc        Update user
//@route        PUT /api/users/:userId
//@access       Private/Admin
const updateUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();


        // const userProfile = await User.findById(req.params.userId);
        // if(user.isAdmin) {
        //     const adminPurchase = {learningPathId: 0}
        //     let existingPurchases = user.purchases
        //     existingPurchases.push(...adminPurchase)
        //     user.purchases = existingPurchases
        //     await user.save()
        // }

        res.status(200).json({
            userId: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            purchases: updatedUser.purchases
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc        Delete user
//@route        DELETE /api/users/:userId
//@access       Private/Admin
const deleteUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (user) {
        if (user.isAdmin) {
            res.status(400)
            throw new Error('Cannot delete admin user');
        }
        await User.deleteOne({_id: user._id});
        res.status(200).json({ message: 'User deleted successfullt'});
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};