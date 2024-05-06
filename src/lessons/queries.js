const addLessons = "INSERT INTO lessons (date, teacher_id, student_id) VALUES ($1, $2, $3)";

module.exports = {
    addLessons
}