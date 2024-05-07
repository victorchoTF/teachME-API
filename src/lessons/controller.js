const pool = require("../../db");
const queries = require("./queries");
const teacherQueries = require("../teachers/queries");
const studentQueries = require("../students/queries");

function getLessonsByTeacherEmail(req, res){
    const teacherEmail = req.params.email;

    pool.query(teacherQueries.getTeacherByEmail, [teacherEmail], (error, results) => {
        if (error)
            return res.status(500).send("Internal Server Error");

        const teacherId = results.rows[0].id;
        pool.query(queries.getLessonsByTeacherId, [teacherId], (error, results) => {
            if (error) 
                return res.status(500).send("Internal Server Error");
    
            return res.status(200).json(results.rows);
        });
    });
}

function getLessonsByStudentId(req, res){
    const studentId = req.params.id;

    pool.query(queries.getLessonsByStudentId, [studentId], (error, results) => {
        if (error)
            return res.status(500).send("Internal Server Error");

        return res.status(200).json(results.rows);
    })
}

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
                        res.status(201).send("Added lessons successfully!");
                    }
                });
            });
        });
    });
}

function deleteExactLesson(req, res){
    const {student_id, teacher_name, timestamp} = req.params;
    pool.query(studentQueries.getStudentById, [student_id], (error, results) => {
        if (error)
            return res.status(500).send("Internal Server Error");

        if (!results.rows.length)
            return res.status(404).send("Student non-existent");

        pool.query(teacherQueries.getTeacherByName, [teacher_name], (error, results) => {
            if (error)
                return res.status(500).send("Internal Server Error");
            
            const teacher_id = results.rows[0].id
            pool.query(teacherQueries.getTeacherById, [teacher_id], (error, results) => {
                if (error)
                    return res.status(500).send("Internal Server Error");
        
                if (!results.rows.length)
                    return res.status(404).send("Teacher non-existent");
                
                pool.query(queries.deleteExactLesson, [student_id, teacher_id, timestamp.replace("_", " ")], (error, results) => {
                    if (error)
                        return res.status(500).send("Internal Server Error");
                    
                    res.status(200).send("Lesson deleted");
                })
        });
        });
    });
}

function deleteLessonsByStudentId(req, res){
    const {student_id} = req.params;

    pool.query(studentQueries.getStudentById, [student_id], (error, results) => {
        if (error)
            return res.status(500).send("Internal Server Error");

        if (!results.rows.length)
            return res.status(404).send("Student non-existent");
        pool.query(queries.deleteLessonsByStudentId, [student_id], (error, results) => {
            if (error)
                return res.status(500).send("Internal Server Error");
            
            res.status(200).send("Lesson deleted");
        });
    });
}

module.exports = {
    getLessonsByTeacherEmail,
    getLessonsByStudentId,
    addLessons,
    deleteExactLesson,
    deleteLessonsByStudentId
}