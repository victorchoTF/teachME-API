const getStudents = "SELECT * FROM students";
const getStudentById = "SELECT * FROM students WHERE id = $1";

const checkEmailExists = "SELECT * from students AS s WHERE s.email = $1";
const checkPhoneExists = "SELECT * from students AS s WHERE s.phone = $1";
const addStudent = "INSERT INTO students (first_name, last_name, phone, email, bio, password) VALUES ($1, $2, $3, $4, $5, $6)";

module.exports = {
    getStudents,
    getStudentById,
    checkEmailExists,
    checkPhoneExists,
    addStudent
}