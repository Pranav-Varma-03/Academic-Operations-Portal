import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router";
import M from "materialize-css";
// import './login.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () =>{

    const navigate = useNavigate();
    
    const [id,setId] = useState('');
    const [password,setPassword] = useState('');
    const [role,setRole] = useState('');

    // const [valid,setValid] = useState(10);

    useEffect(() =>{
        M.AutoInit();
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault();

        const getData = async()=>{
            try {
                await axios.get(`http://localhost:3002/auth`,{
                    params: {
                        role: role,
                        id: id,
                        password: password
                    }
                }).then(res =>{
                    console.log(res.data);
                    console.log(res.data[0].valid );
                    if(res.data[0].valid){
                        Cookies.set('User',parseInt(id));
                        navigate('/' + role + '/' + id);
                    }else{
                        alert('Incorrect Credentials, Please Retry');
                    }
               
            })
            } catch (error) {
                
            }
        }

        getData();

        console.log(role,id,password);
        // console.log(valid);
        
        
    }

    return(
        <div className="center">
            <h1>Login Page.</h1>
            <div className="container">
        
            <div className="dropdown-container">
                
                    <ul id="dropdown2" className="dropdown-content">
                        <li><a id="admin" onClick={(e) => {setRole(e.target.id)}}>Admin</a></li>
                        <li><a id="student" onClick={(e) => {setRole(e.target.id)}}>Student</a></li>
                        <li><a id="instructor" onClick={(e) => {setRole(e.target.id)}}>Instructor</a></li>
                    </ul>
                    <a className="btn dropdown-trigger" href="#!" data-target="dropdown2">Roles ⇩</a>

                    <div className="row">
                        <form className="col s12" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setId(e.target.value)}}></textarea>
                                    <label htmlFor="textarea1">ID</label>
                                    </div>
                                </div>
                    
                            <div className="row">
                            <div className="input-field col s12">
                            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setPassword(e.target.value)}}></textarea>
                            <label htmlFor="textarea1">Password</label>
                            </div>
                            </div>

                            <button className="waves-effect waves-light btn"> Login </button>

                        </form>
                    </div>
            </div>
        </div>
        </div>
        
    )
}

export default Login