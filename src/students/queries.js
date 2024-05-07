const getStudents = "SELECT * FROM students";
const getStudentById = "SELECT * FROM students WHERE id = $1";
const getStudentByEmail = "SELECT * FROM students WHERE email = $1";
const getStudentByName = "SELECT * FROM students WHERE CONCAT(first_name, '_', last_name) = $1";

const checkPhoneExists = "SELECT * from students WHERE phone = $1";
const addStudent = "INSERT INTO students (first_name, last_name, phone, email, bio, password) VALUES ($1, $2, $3, $4, $5, $6)";
const deleteStudent = "DELETE FROM students WHERE id = $1";

module.exports = {
    getStudents,
    getStudentById,
    getStudentByEmail,
    getStudentByName,
    checkPhoneExists,
    addStudent,
    deleteStudent
}