const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// '/api/users/'
router.get("/", (req, res) => {
  res.send(`<h1>User</h1>`);
});

// 회원 등록
router.post("/", userController.createUser);

// 이메일 중복 체크
router.post("/duplex", userController.duplicatedEmail);

module.exports = router;
