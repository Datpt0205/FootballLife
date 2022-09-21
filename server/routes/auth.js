import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello, it's auth endpoint")
})

router.get('/register', (req, res) => {
    res.send("register")
})

export default router 