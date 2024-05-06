const pool = require("../../db");
const queries = require("./queries");
const teacherQueries = require("../teachers/queries");

function addLessons(req, res) {
    const { lessons, studentId, teacherEmail } = req.body;

    pool.query(teacherQueries.getTeacherByEmail, [teacherEmail], (error, results) => {
        if (error || results.rows.length === 0)
            return res.status(500).send("Internal Server Error");

        const teacherId = results.rows[0].id;

        let lessonsProcessed = 0;
        lessons.forEach(lesson => {
            const date = new Date();
            date.setDate(lesson.number);
            date.setHours(0, 0, 0, 0);
            const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(lesson.day);
            date.setDate(date.getDate() + (dayOfWeek - date.getDay() + 7) % 7);

            Object.keys(lesson.lessons).forEach(time => {
                const hour = parseInt(time.split(':')[0]);
                const timestamp = new Date(date);
                timestamp.setHours(hour);

                pool.query(queries.addLessons, [timestamp, teacherId, studentId], (error, results) => {
                    if (error) {
                        console.error("Error adding lesson:", error);
                        return res.status(500).send("Internal Server Error");
                    }
                    
                    lessonsProcessed++;

                    if (lessonsProcessed === lessons.length * Object.keys(lesson.lessons).length) {
                        res.status(200).send("Added lessons successfully!");
                    }
                });
            });
        });
    });
}

module.exports = {
    addLessons
}