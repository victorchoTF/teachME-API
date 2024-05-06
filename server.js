const express = require("express");

const studentRoutes = require("./src/students/routes");
const teacherRoutes = require("./src/teachers/routes");
const lessonsRoutes = require("./src/lessons/routes");
const scrContoller = require("./src/controller");

const app = express();
const port = 3000;

app.use(express.json());


app.post("/login", scrContoller.login);

app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/lessons", lessonsRoutes);


app.listen(port, () => {
    console.log(`API running on port ${port}`);
});