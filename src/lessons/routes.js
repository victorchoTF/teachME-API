const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.addLessons)

router.get("/teacher/:email", controller.getLessonsByTeacherEmail);
router.get("/student/:id", controller.getLessonsByStudentId);

router.delete("/:student_id/:teacher_name/:timestamp", controller.deleteExactLesson);
router.delete("/:student_id", controller.deleteLessonsByStudentId)
module.exports = router;