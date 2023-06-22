import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

const Instructorlist = ()=>{

    const navigate = useNavigate();

    const [data,setData] = useState([]);
    const [list,setList] = useState([]);
    const [instructor,setInstructor] = useState('');
    const [name,setName] = useState('');
    const [dept,setDept] = useState('');
    useEffect(()=>{
        const getInstructor = async()=>{
            try {
                await axios.get(`http://localhost:3002/instructorlist`).then(res =>{
                    setData(res.data);
                })
            } catch (error) {
                
            }
        }
        getInstructor();
    },[instructor,name,dept])



    const handleDeleteClick = (i_id)=>{
        try {
            axios.post(`http://localhost:3002/instructor/del`,{
            i_id: i_id
            }).then(res =>{
                alert("Successfully removed Instructor");
                window.location.reload();
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleClickInstructor = (i_id)=>{
        navigate('/teaches/instructor/'+i_id);
    }

    useEffect(()=>{
        const list = data.map( instructor =>{
            return(
                <a className="collection-item" key={instructor.i_id} style={{ color: "black" }}>
                    <div className="row">
                        <div className="col s6" onClick={()=>{handleClickInstructor(instructor.i_id)}}>
                            <span className="title">Name: {instructor.name}</span>
                        </div>
                        <div className="s6">
                            <span className="title">Id: {instructor.i_id}</span>
                        </div>
                        <div className="right">
                        <button className="material-icons" onClick={() =>{handleDeleteClick(instructor.i_id)}}>Remove Instructor</button>
                        </div>
                    </div>
                </a>
            )
        })

        setList(list);

    },[data])

    const handleSubmit = (e)=>{
        e.preventDefault();

        const addInstructor = async()=>{
            try {
                axios.post(`http://localhost:3002/instructor/add`,{
                    i_id: instructor,
                    name: name,
                    dept: dept
                }).then(res =>{
                    alert("Instructor Added Successfully!");
                    // window.location.reload();
                    setInstructor('');
                    setName('');
                    setDept('');
                })
                
            } catch (error) {
                console.error(error);
            }
        }
        addInstructor();
    }

return(
    <>
    <h5 className="center">List of Instructor's in IITH</h5>
    
    <div className="container">
    <h6>Note: Click on Instructors to View Course's they teach.</h6>
    <div className="collection">
        {list}
    </div>

    <h5>Enter Details to Add New Instructor:</h5>

    <form className="col s12" onSubmit={handleSubmit}>
        <div className="row">
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" value={instructor} onChange={(e) => {setInstructor(e.target.value)}}></textarea>
            <label htmlFor="textarea1">ID</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" value={name} onChange={(e) => {setName(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Name</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" value={dept} onChange={(e) => {setDept(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Dept</label>
            </div>
            <button className="col s2"> Add Instructor</button>
        </div>
       
    </form>
    </div>
    </>
)
}

export default Instructorlist