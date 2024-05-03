const pool = require("../../db");
const queries = require("./queries");

function getStudents(req, res){
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;

        res.status(200).json(results.rows);
    });
}

function getStudentById(req, res){
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;

        res.status(200).json(results.rows);
    })
}

function addStudent(req, res){
    const {first_name, last_name, phone, email, bio, password} = req.body;

    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length !== 0)
            res.status(409).send("Email already exists");
        
        pool.query(queries.checkPhoneExists, [phone], (error, results) => {
            if (results.rows.length !== 0)
                res.status(409).send("Phone number already exists");
             
            pool.query(queries.addStudent, [first_name, last_name, phone, email, bio, password], (error, results) => {
                if (error) throw error;
        
                res.status(201).send("Student created successfully!");
            });
        });
    });
}

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
}