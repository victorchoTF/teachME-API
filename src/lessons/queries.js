const getLessonsByTeacherId = "SELECT * FROM lessons WHERE DATE(date) >= CURRENT_DATE AND teacher_id = $1";
const getLessonsByStudentId = "SELECT l.date, l.student_id, CONCAT(t.first_name, ' ', t.last_name) AS teacher_name FROM lessons AS l JOIN teachers AS t ON t.id = l.teacher_id WHERE DATE(l.date) >= CURRENT_DATE AND l.student_id = $1";
const addLessons = "INSERT INTO lessons (date, teacher_id, student_id) VALUES ($1, $2, $3)";

module.exports = {
    getLessonsByTeacherId,
    getLessonsByStudentId,
    addLessons
}