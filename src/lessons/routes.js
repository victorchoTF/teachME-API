const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.addLessons)

router.get("/teacher/picker/:email", controller.getLessonsByTeacherEmail);
router.get("/teacher/:id", controller.getLessonsByTeacherId);
router.delete("/teacher/:id", controller.deleteLessonsByTeacherId);
router.delete("/teacher/:teacher_id/:student_name/:timestamp", controller.deleteExactLessonForTeacher);

router.get("/student/:id", controller.getLessonsByStudentId);
router.delete("/student/:id", controller.deleteLessonsByStudentId);
router.delete("/student/:student_id/:teacher_name/:timestamp", controller.deleteExactLessonForStudent);

module.exports = router;