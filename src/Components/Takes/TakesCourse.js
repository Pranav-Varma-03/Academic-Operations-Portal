import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useParams } from "react-router";
import axios from "axios";
const TakesCourse = () => {

    // const ecookie = Cookies.get('User');
    const [list, setList] = useState([]);
    const [sids, setSids] = useState([]);
    const [data, setData] = useState([]);
    const [grade, setGrade] = useState('')
    const [student, setStudent] = useState('')
    const { c_id } = useParams();

    useEffect(() => {
        const fetchCourseid = async () => {
            try {
                console.log("course id: " + c_id);
                await axios.get(`http://localhost:3002/takes/course`, {
                    params: {
                        c_id: c_id
                    }
                }).then(res => {
                    setSids(res.data)
                    console.log("S IDs");
                    console.log(res.data)
                })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchCourseid();

    }, [c_id])

    useEffect(() => {
        sids.map(sid => {
            const fetchStudents = async () => {
                try {

                    await axios.get(`http://localhost:3002/student`, {
                        params: {
                            s_id: sid.s_id
                        }
                    }).then(res => {
                        setData(prevData => [...prevData, res.data[0]]);
                        // const course = res.data[0];

                        // // courseExists is always returning false.....
                        // const courseExists = data.some(item => item.c_id === course.c_id);
                        // console.log(courseExists);
                        // if (!courseExists) {
                        //     setData(prevData => [...prevData, course]);
                        // }                             

                        //setData is not immediately updating variable data.
                        //hence... duplicates are still adding to variable data.....
                        console.log("C Names");
                        console.log(data)
                    })
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            return fetchStudents();

        })
    }, [sids])

    console.log("data = ");
    console.log(data);

    
    useEffect(() => {

        const uniqueData = Array.from(new Set(data.map((student) => student.s_id))).map((s_id) => {
            return data.find((student) => student.s_id === s_id);
        });

        //not working...
        //   setData(uniqueData);

        const updatedList = uniqueData.map(student => {
            return (
                <li className="collection-item" key={student.s_id} >
                    <div className="row">
                        <div className="col s6">
                            <span className="title">Name: {student.name}</span>
                        </div>
                        Grade: {sids.length > 0 ? sids.find(obj => obj.s_id === student.s_id)?.grade : ''}
                        <div className="right">
                            <span className="title">Student ID: {student.s_id}</span>
                        </div>
                    </div>

                </li>
            )
        })

        setList(updatedList);
    }, [data, sids])

    const handleSubmit = (e)=>{
        e.preventDefault();

        
            const addGrade = async()=>{
                try {
                    await axios.post(`http://localhost:3002/takes/grade`,{
                        s_id: student,
                        c_id:c_id,
                        grade: grade
                    }).then(res =>{
                        setGrade('');
                        setStudent('');
                        alert("Grade Submitted Sucessfully");
                        window.location.reload();
                })
                } catch (error) {
                    alert("Incorrect Credentials, Please retry");
                }
            }
            addGrade();
       
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <h4>Students Registered :</h4>
                    <ul className="collection">
                        {list}
                    </ul>
                    <div>

                        <form onSubmit={handleSubmit}>
                        Grade Submission:
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" value={student} onChange={(e) => { setStudent(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Student ID</label>
                                </div>

                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" value={grade} onChange={(e) => { setGrade(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Grade</label>
                                </div>
                            </div>
                            <button className="row">Submit Grade</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}

export default TakesCourse