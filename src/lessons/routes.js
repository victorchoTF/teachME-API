const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", (req, res) => {res.send("Getting lessons!")})
router.post("/", controller.addLessons)

module.exports = router;