const getLessonsByTeacherId = "SELECT * FROM lessons WHERE DATE(date) >= CURRENT_DATE AND teacher_id = $1";
const addLessons = "INSERT INTO lessons (date, teacher_id, student_id) VALUES ($1, $2, $3)";

module.exports = {
    getLessonsByTeacherId,
    addLessons
}