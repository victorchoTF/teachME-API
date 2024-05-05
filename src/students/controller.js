const pool = require("../../db");
const queries = require("./queries");

function getStudents(req, res){
    pool.query(queries.getStudents, (error, results) => {
        if (error) 
            return res.status(500).send("Internal Server Error");

        res.status(200).json(results.rows);
    });
}

function getStudentById(req, res){
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) 
            return res.status(500).send("Internal Server Error");

        res.status(200).json(results.rows);
    })
}

function addStudent(req, res){
    const {first_name, last_name, phone, email, bio, password} = req.body;

    pool.query(queries.getStudentByEmail, [email], (error, results) => {
        if (error) 
            return res.status(500).send("Internal Server Error");

        if (results.rows.length !== 0)
            return res.status(409).send("Email already exists");

        pool.query(queries.checkPhoneExists, [phone], (error, results) => {
            if (error) 
                return res.status(500).send("Internal Server Error");

            if (results.rows.length !== 0)
                return res.status(409).send("Phone number already exists");
             
            pool.query(queries.addStudent, [first_name, last_name, phone, email, bio, password], (error, results) => {
                if (error) 
                    return res.status(500).send("Internal Server Error");

                pool.query(queries.getStudentByEmail, [email], (error, results) => {
                    res.status(201).json(results.rows[0]);
                }) 
            });
        });
    });
}

function deleteStudent(req, res){
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error)
            return res.status(500).send("Internal Server Error");

        if (!results.rows.length)
            return res.status(404).send("Student non-existent");

        pool.query(queries.deleteStudent, [id], (error, results) => {
            if (error)
                return res.status(500).send("Internal Server Error");

            res.status(200).send("Student deleted");
        });
    });
}

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    deleteStudent, 
}