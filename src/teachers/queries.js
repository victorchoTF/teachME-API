const getTeachers = "SELECT * FROM teachers";
const getTeacherById = "SELECT * FROM teachers WHERE id = $1";
const getTeacherByEmail = "SELECT * FROM teachers WHERE email = $1";

const checkPhoneExists = "SELECT * from teachers WHERE phone = $1";
const addTeacher = "INSERT INTO teachers (first_name, last_name, phone, email, bio, password) VALUES ($1, $2, $3, $4, $5, $6)";
const deleteTeacher = "DELETE FROM teachers WHERE id = $1";

module.exports = {
    getTeachers,
    getTeacherById,
    getTeacherByEmail,
    checkPhoneExists,
    addTeacher,
    deleteTeacher
}