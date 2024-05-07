const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.addLessons)

router.get("/teacher/:email", controller.getLessonsByTeacherEmail);
router.get("/student/:id", controller.getLessonsByStudentId);

module.exports = router;