import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Studentlist = ()=>{
    const navigate = useNavigate();

    const [data,setData] = useState([]);
    const [list,setList] = useState([]);
    const [student,setStudent] = useState('');
    const [name,setName] = useState('');
    const [dept,setDept] = useState('');
    useEffect(()=>{
        const getStudent = async()=>{
            try {
                await axios.get(`http://localhost:3002/studentlist`).then(res =>{
                    setData(res.data);
                })
            } catch (error) {
                
            }
        }
        getStudent();
    },[student,name,dept])



    const handleDeleteClick = (s_id)=>{
        try {
            axios.post(`http://localhost:3002/student/del`,{
            s_id: s_id
            }).then(res =>{
                alert("Successfully removed Student");
                window.location.reload();
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleClickStudent = (s_id)=>{
        navigate('/takes/student/'+s_id);
    }

    useEffect(()=>{
        const list = data.map( student =>{
            return(
                <a className="collection-item" key={student.s_id} style={{ color: "black" }}>
                    <div className="row">
                        <div className="col s6" onClick={()=>{handleClickStudent(student.s_id)}}>
                            <span className="title">Name: {student.name}</span>
                        </div>
                        <div className="s6">
                            <span className="title">Id: {student.s_id}</span>
                        </div>
                        <div className="right">
                        <button className="material-icons" onClick={() =>{handleDeleteClick(student.s_id)}}>Remove Student</button>
                        </div>
                    </div>
                </a>
            )
        })

        setList(list);

    },[data])

    const handleSubmit = (e)=>{
        e.preventDefault();

        const addStudent = async()=>{
            try {
                axios.post(`http://localhost:3002/student/add`,{
                    s_id: student,
                    name: name,
                    dept: dept
                }).then(res =>{
                    alert("Student Added Successfully!");
                    // window.location.reload();
                    setStudent('');
                    setName('');
                    setDept('');
                })
                
            } catch (error) {
                console.error(error);
            }
        }
        addStudent();
    }

return(
    <>
    <h5 className="center">List of Student's in IITH</h5>
    
    <div className="container">
    <h6>Note: Click on Students to View Course's they enrolled.</h6>
    <div className="collection">
        {list}
    </div>

    <h5>Enter Details to Add New Student:</h5>

    <form className="col s12" onSubmit={handleSubmit}>
        <div className="row">
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setStudent(e.target.value)}}></textarea>
            <label htmlFor="textarea1">ID</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setName(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Name</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setDept(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Dept</label>
            </div>
            <button className="col s2"> Add Student</button>
        </div>
       
    </form>
    </div>
    </>
)
}

export default Studentlist

