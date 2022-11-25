import express from 'express';
import {
    newUser,
    updateUser, 
    deleteUser, 
    getUser, 
    getUsers
}  from '../controllers/user.js'
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send('Hello user, you are Logged In')
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//newUser
router.post('/newUser', newUser)
//Update
router.put('/:id', verifyUser, updateUser);

//delete
router.delete('/:id', verifyUser, deleteUser);

//get
router.get('/:id', verifyUser, getUser);

//get all
router.get('/', verifyAdmin, getUsers);

export default router 