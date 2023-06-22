import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Courselist = ()=>{
    const navigate = useNavigate();

    const [data,setData] = useState([]);
    const [list,setList] = useState([]);
    const [course,setCourse] = useState('');
    const [title,setTitle] = useState('');
    const [dept,setDept] = useState('');
    useEffect(()=>{
        const getCourse = async()=>{
            try {
                await axios.get(`http://localhost:3002/courselist`).then(res =>{
                    setData(res.data);
                })
            } catch (error) {
                
            }
        }
        getCourse();
    },[course,title,dept])



    const handleDeleteClick = (c_id)=>{
        try {
            axios.post(`http://localhost:3002/course/del`,{
            c_id: c_id
            }).then(res =>{
                alert("Successfully removed Course");
                window.location.reload();
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleClickCourse = (c_id)=>{
        navigate('/takes/course/'+c_id);
    }

    useEffect(()=>{
        const list = data.map( course =>{
            return(
                <a className="collection-item" key={course.c_id} style={{ color: "black" }}>
                    <div className="row">
                        <div className="col s6" onClick={()=>{handleClickCourse(course.c_id)}}>
                            <span className="title">Name: {course.title}</span>
                        </div>
                        <div className="s6">
                            <span className="title">Id: {course.c_id}</span>
                        </div>
                        <div className="right">
                        <button className="material-icons" onClick={() =>{handleDeleteClick(course.c_id)}}>Remove Course</button>
                        </div>
                    </div>
                </a>
            )
        })

        setList(list);

    },[data])

    const handleSubmit = (e)=>{
        e.preventDefault();

        const addCourse = async()=>{
            try {
                axios.post(`http://localhost:3002/course/add`,{
                    c_id: course,
                    title: title,
                    dept: dept
                }).then(res =>{
                    alert("Course Added Successfully!");
                    // window.location.reload();
                    setCourse('');
                    setTitle('');
                    setDept('');
                })
                
            } catch (error) {
                console.error(error);
            }
        }
        addCourse();
    }

return(
    <>
    <h5 className="center">List of Course's in IITH</h5>
    
    <div className="container">
    <h6>Note: Click on Courses to View Course Students enrolled.</h6>
    <div className="collection">
        {list}
    </div>

    <h5>Enter Details to Add New Course:</h5>

    <form className="col s12" onSubmit={handleSubmit}>
        <div className="row">
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setCourse(e.target.value)}}></textarea>
            <label htmlFor="textarea1">ID</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setTitle(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Title</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setDept(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Dept</label>
            </div>
            <button className="col s2"> Add Course</button>
        </div>
       
    </form>
    </div>
    </>
)
}

export default Courselist



