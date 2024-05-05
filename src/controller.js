const pool = require("../db");
const studentQueries = require("./students/queries");
const teacherQueries = require("./teachers/queries");


function login(req, res){
    const {email, password} = req.body;

    pool.query(studentQueries.getStudentByEmail, [email], (studentError, studentResults) => {
        if (studentError)
            return res.status(500).send("Internal Server Error");

        pool.query(teacherQueries.getTeacherByEmail, [email], (teacherError, teacherResults) => {
            if (teacherError)
                return res.status(500).send("Internal Server Error");

            let user;
            if (studentResults.rows.length === 0){
                if (teacherResults.rows.length === 0)
                    return res.status(404).send("User not found");
                
                
                user = {...teacherResults.rows[0], profileType: "Teacher"};
            } else {
                user = {...studentResults.rows[0], profileType: "Student"};
            }
                
            
            if (user.password !== password)
                return res.status(401).send("Passowrd missmatch");

            return res.status(200).json(user);
            
            
        })
    })
}

module.exports = {
    login
}