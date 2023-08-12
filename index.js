const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
// const pool = require('./conf')

const app = express()
const port = 3002

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "sdf",
    password: "test@323",
    database: "miniAims",
    connectionLimit: 10
});


app.get('/auth', async(req,res) =>{
    try{

        const {role,id,password} = req.query;
        
        const query = `SELECT password FROM ${role} WHERE ${role[0]}_id = ?`;

        const [rows] = await pool.promise().query(query,[parseInt(id)]);

        // console.log(rows[0].password);
        if(password == rows[0].password){
            res.json([{valid:true}])
            // res.send(1);
        }else{
            res.json([{valid:false}])
            // res.send(0);
        }

        // res.json(rows);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/student',async(req,res) =>{
    try {
        
        const {s_id} = req.query;
        const query = `SELECT * FROM student WHERE s_id = ?`;

        const [rows] = await pool.promise().query(query,[parseInt(s_id)]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.get('/studentlist',async(req,res) =>{
    try {
        
        const query = `SELECT * FROM student`;

        const [rows] = await pool.promise().query(query);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
}) 

app.post('/student/del',async(req,res) =>{
    try {
        const {s_id} = req.body;

        const query = `DELETE FROM student WHERE s_id = ?`;

        const [rows] = await pool.promise().query(query,[parseInt(s_id)]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.post('/student/add',async(req,res) =>{
    try {
        const {s_id,name,dept} = req.body;

        const query = `INSERT INTO student VALUES( ?,'test',?,?)`;

        const [rows] = await pool.promise().query(query,[parseInt(s_id),name,dept]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.get('/takes/student',async(req,res) =>{
    try {
        
        const {s_id} = req.query;
        const query = `SELECT * FROM takes WHERE s_id = ?`;

        const [rows] = await pool.promise().query(query,[parseInt(s_id)]);

        res.json(rows);
        
    } catch (error) {
        console.error(error)
    }

})

app.get('/takes/course',async(req,res) =>{
    try {
        
        const {c_id} = req.query;
        console.log(c_id);
        const query = `SELECT * FROM takes WHERE c_id = ?`;

        const [rows] = await pool.promise().query(query,[parseInt(c_id)]);

        res.json(rows);
        
    } catch (error) {
        console.error(error)
    }

})

app.post('/takes/add',async(req,res) =>{
    try {
        
        const {s_id,c_id} = req.body;
        console.log(s_id);
        console.log(c_id);
        const query = `INSERT INTO takes VALUES(?,?,'')`;

        const [rows] = await pool.promise().query(query,[parseInt(s_id),parseInt(c_id)]);

        res.json(rows);
        // console.log(res.json(rows))
        // if(rows.length != 0)
        
    } catch (error) {
        // console.log("error brooo")
        // console.log(r)

        console.error(error)
    }
})

app.post('/takes/del',async(req,res) =>{


    try {
        
        const {s_id,c_id} = req.body;
        console.log(s_id);
        console.log(c_id);
        const query = `DELETE FROM takes WHERE s_id = ? AND c_id = ?`;

        const [rows] = await pool.promise().query(query,[parseInt(s_id),parseInt(c_id)]);

        res.json(rows);
        // console.log(res.json(rows))
        // if(rows.length != 0)
        
    } catch (error) {
        // console.log("error brooo")
        // console.log(r)
        
        console.error(error)
    }
})


app.post('/takes/grade',async(req,res) =>{
    try {
        
        const {s_id,c_id,grade} = req.body;
        console.log("student"+s_id);
        console.log("course"+c_id);
        console.log(grade);
        const query = `UPDATE takes SET grade = ? WHERE s_id = ? AND c_id=?`;

        const [rows] = await pool.promise().query(query,[grade,parseInt(s_id),parseInt(c_id)]);

        res.json(rows);
        // console.log(res.json(rows))
        // if(rows.length != 0)
        
    } catch (error) {
        // console.log("error brooo")
        // console.log(r)

        console.error(error)
    }
})
app.get('/course',async(req,res) =>{
    try {
        
        const {c_id} = req.query;
        const query = `SELECT * FROM course WHERE c_id = ?`;

        const [rows] = await pool.promise().query(query,[parseInt(c_id)]);
        
        res.json(rows);
        
    } catch (error) {
        console.error(error)
    }
})

app.post('/course/available',async(req,res) =>{
    try {
        
        const {c_id,available} = req.body;
        console.log(c_id);
        console.log(available);
        const query = `UPDATE course SET available = ? WHERE c_id = ?`;

        const [rows] = await pool.promise().query(query,[parseInt(available),parseInt(c_id)]);

        res.json(rows);
        // console.log(res.json(rows))
        // if(rows.length != 0)
        
    } catch (error) {
        // console.log("error brooo")
        // console.log(r)

        console.error(error)
    }
})

app.get('/courselist',async(req,res) =>{
    try {
        
        const query = `SELECT * FROM course`;

        const [rows] = await pool.promise().query(query);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
}) 

app.post('/course/del',async(req,res) =>{
    try {
        const {c_id} = req.body;

        const query = `DELETE FROM course WHERE c_id = ?`;

        const [rows] = await pool.promise().query(query,[parseInt(c_id)]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.post('/course/add',async(req,res) =>{
    try {
        const {c_id,title,dept} = req.body;

        const query = `INSERT INTO course VALUES( ?,?,?,'1')`;

        const [rows] = await pool.promise().query(query,[parseInt(c_id),title,dept]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})


app.get('/instructor',async(req,res) =>{
    try {
        
        const {i_id} = req.query;
        const query = `SELECT * FROM instructor WHERE i_id = ?`;

        const [rows] = await pool.promise().query(query,[parseInt(i_id)]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.get('/instructorlist',async(req,res) =>{
    try {
        
        const query = `SELECT * FROM instructor`;

        const [rows] = await pool.promise().query(query);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
}) 

app.post('/instructor/del',async(req,res) =>{
    try {
        const {i_id} = req.body;

        const query = `DELETE FROM instructor WHERE i_id = ?`;

        const [rows] = await pool.promise().query(query,[parseInt(i_id)]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.post('/instructor/add',async(req,res) =>{
    try {
        const {i_id,name,dept} = req.body;

        const query = `INSERT INTO instructor VALUES( ?,'test',?,?)`;

        const [rows] = await pool.promise().query(query,[parseInt(i_id),name,dept]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.get('/teaches/instructor',async(req,res) =>{
    try {
        
        const {i_id} = req.query;
        const query = `SELECT * FROM teaches WHERE i_id = ?`;

        const [rows] = await pool.promise().query(query,[parseInt(i_id)]);

        res.json(rows);
        
    } catch (error) {
        console.error(error)
    }

})

app.post('/teaches/add',async(req,res) =>{
    try {
        
        const {i_id,c_id} = req.body;
        console.log(i_id);
        console.log(c_id);
        const query = `INSERT INTO teaches VALUES(?,?)`;

        const [rows] = await pool.promise().query(query,[parseInt(i_id),parseInt(c_id)]);

        res.json(rows);
        // console.log(res.json(rows))
        // if(rows.length != 0)
        
    } catch (error) {
        // console.log("error brooo")
        // console.log(r)

        console.error(error)
    }
})

app.post('/teaches/del',async(req,res) =>{


    try {
        
        const {i_id,c_id} = req.body;
        console.log(i_id);
        console.log(c_id);
        const query = `DELETE FROM teaches WHERE i_id = ? AND c_id = ?`;

        const [rows] = await pool.promise().query(query,[parseInt(i_id),parseInt(c_id)]);

        res.json(rows);
        // console.log(res.json(rows))
        // if(rows.length != 0)
        
    } catch (error) {
        // console.log("error brooo")
        // console.log(r)
        
        console.error(error)
    }
})

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost: ${port}`)
})
