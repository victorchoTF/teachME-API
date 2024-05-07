const getLessonsByTeacherId = "SELECT l.date, l.teacher_id, CONCAT(s.first_name, ' ', s.last_name) AS username FROM lessons AS l JOIN students AS s ON s.id = l.student_id WHERE DATE(l.date) >= CURRENT_DATE AND l.teacher_id = $1 ORDER BY l.date ASC";
const getLessonsByStudentId = "SELECT l.date, l.student_id, CONCAT(t.first_name, ' ', t.last_name) AS username FROM lessons AS l JOIN teachers AS t ON t.id = l.teacher_id WHERE DATE(l.date) >= CURRENT_DATE AND l.student_id = $1 ORDER BY l.date ASC";
const addLessons = "INSERT INTO lessons (date, teacher_id, student_id) VALUES ($1, $2, $3)";
const deleteExactLesson = "DELETE FROM lessons WHERE student_id = $1 AND teacher_id = $2 AND date = $3";
const deleteLessonsByStudentId = "DELETE FROM lessons WHERE student_id = $1;";
const deleteLessonsByTeacherId = "DELETE FROM lessons WHERE teacher_id = $1;";

module.exports = {
    getLessonsByTeacherId,
    getLessonsByStudentId,
    addLessons,
    deleteExactLesson,
    deleteLessonsByStudentId,
    deleteLessonsByTeacherId
}