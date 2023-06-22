import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Student = ()=>{

    const navigate = useNavigate();

    // const ecookie = Cookies.get('User');
    const {s_id} = useParams();
    const [data,setData] = useState([]);

    useEffect(()=>{
        const fetchData = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/student`,{
                params:{
                    s_id: s_id
                }
            }).then(res =>{
                setData(res.data)
                console.log(res.data)
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    },[s_id])



    const handleClick = (e) =>{
        navigate('/takes/student/' + s_id);
    }

    return(
        <div>
            <h2 className="center">Student Page</h2>
        <div className="container">
            <h5 className="center">My Details</h5>
            <ul className="collection">
            <li className="collection-item">
            {data.length > 0 && <p>Name: {data[0].name}</p>}
            </li>
            <li className="collection-item">
            {data.length > 0 && <p>Dept: {data[0].dept}</p>}
            </li>
            <li className="collection-item">
            {data.length > 0 && <p>Id: {data[0].s_id}</p>}
            </li>
            </ul>
        </div>
            <div className="center">
            <button className="waves-effect waves-light btn" onClick={handleClick}> View My Courses</button>
        </div>    
        </div>
    )
}   

export default Student