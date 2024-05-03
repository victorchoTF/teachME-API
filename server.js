const express = require("express");

const studentRoutes = require("./src/students/routes");
const teacherRoutes = require("./src/teachers/routes");

const app = express();
const port = 3000;

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Students at /students; Teachers at /teachers");
})

app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);


app.listen(port, () => {
    console.log(`API running on port ${port}`);
});