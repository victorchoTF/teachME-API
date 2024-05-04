const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getTeachers);
router.post("/", controller.addTeacher);

router.get("/:id", controller.getTeacherById);
router.delete("/:id", controller.deleteTeacher);

router.post("/login", controller.loginStudent)

module.exports = router;