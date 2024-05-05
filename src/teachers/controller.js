const pool = require("../../db");
const queries = require("./queries");

function getTeachers(req, res){
    pool.query(queries.getTeachers, (error, results) => {
        if (error) 
            return res.status(500).send("Internal Server Error");

        res.status(200).json(results.rows);
    });
}

function getTeacherById(req, res){
    const id = parseInt(req.params.id);

    pool.query(queries.getTeacherById, [id], (error, results) => {
        if (error) 
            return res.status(500).send("Internal Server Error");

        res.status(200).json(results.rows);
    })
}

function addTeacher(req, res){
    const {first_name, last_name, phone, email, bio, password} = req.body;

    pool.query(queries.getTeacherByEmail, [email], (error, results) => {
        if (error) 
            return res.status(500).send("Internal Server Error");

        if (results.rows.length !== 0)
            return res.status(409).send("Email already exists");

        pool.query(queries.checkPhoneExists, [phone], (error, results) => {
            if (error) 
                return res.status(500).send("Internal Server Error");

            if (results.rows.length !== 0)
                return res.status(409).send("Phone number already exists");
             
            pool.query(queries.addTeacher, [first_name, last_name, phone, email, bio, password], (error, results) => {
                if (error) 
                    return res.status(500).send("Internal Server Error");

                pool.query(queries.getTeacherByEmail, [email], (error, results) => {
                    res.status(201).json(results.rows[0]);
                }) 
            });
        });
    });
}

function deleteTeacher(req, res){
    const id = parseInt(req.params.id);
    pool.query(queries.getTeacherById, [id], (error, results) => {
        if (error)
            return res.status(500).send("Internal Server Error");

        if (!results.rows.length)
            return res.status(404).send("Teacher non-existent");

        pool.query(queries.deleteTeacher, [id], (error, results) => {
            if (error)
                return res.status(500).send("Internal Server Error");

            res.status(200).send("Teacher deleted");
        });
    });
}

module.exports = {
    getTeachers,
    getTeacherById,
    addTeacher,
    deleteTeacher,
}