import React, { useEffect, useState, useCallback} from "react"
import Cookies from "js-cookie"
import { useParams } from "react-router";
import axios from "axios";

const TakesStudent = ()=>{

    const ecookie = Cookies.get('User');
    const [list,setList] = useState([]);
    const [cids,setCids] = useState([]);
    const [data,setData] = useState([]);
    const {s_id} = useParams();
    const [clickedDel,setClickedDel] = useState(0);

    const [add,setAdd] = useState('');

    useEffect(()=>{
        const fetchCourseid = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/takes/student`,{
                params:{
                    s_id: s_id
                }
            }).then(res =>{
                setCids(res.data)
                console.log("C IDs");
                console.log(res.data)
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }

        fetchCourseid();
        
    },[add,clickedDel,s_id])

    useEffect(()=>{
        cids.map( cid =>{
            const fetchCourses = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/course`,{
                params:{
                    c_id: cid.c_id
                }
            }).then(res =>{

                const course = res.data[0];

                // courseExists is always returning false.....
                const courseExists = data.some(item => item.c_id === course.c_id);
                console.log(courseExists);
                if (!courseExists) {
                    setData(prevData => [...prevData, course]);
                }                             
                
                //setData is not immediately updating variable data.
                //hence... duplicates are still adding to variable data.....
                console.log("C Names");
                console.log(data)
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
        return fetchCourses();
        
        })
    },[cids,data])

    console.log("data = ");
    console.log(data);

    const handleDeleteClick = useCallback(async(c_id) =>{

        if(parseInt(ecookie) === parseInt(s_id)){
    
            const uniqueData = Array.from(new Set(data.map((course) => course.c_id))).map((c_id) => {
                return data.find((course) => course.c_id === c_id);
              });
    
            const available = (uniqueData.find(obj => obj.c_id === c_id)).available
    
            if(parseInt(available) === 1){ //Course can be added or dropped.
                const delCourse = async()=>{
                    try {
                        await axios.post(`http://localhost:3002/takes/del`,{
                            s_id: s_id,
                            c_id: c_id
                        }).then(res =>{
                            setClickedDel((prevState) => prevState + 1);
                            alert("Sucessfully Deleted");
                            window.location.reload();
                    })
                    } catch (error) {
                        alert("Error, Pls retry");
                    }
                }
                delCourse();
    
    
            }else{
                alert("Course edit deadline is completed, Can't Edit");
            }
    
        }else{
            alert("You cannot Delete")
        }
    
    },[data,ecookie,s_id])


    useEffect(()=>{

        const uniqueData = Array.from(new Set(data.map((course) => course.c_id))).map((c_id) => {
            return data.find((course) => course.c_id === c_id);
          });

        //not working...
        //   setData(uniqueData);

        const updatedList = uniqueData.map(course =>{
            return(
                <li className="collection-item" key={course.c_id} >
                    <div className="row">
                        <div className="col s6">
                            <span className="title">{course.title}</span>
                        </div>
                        <div className="s6">
                            <span className="title">Grade: {cids.length > 0 ? cids.find(obj => obj.c_id === course.c_id)?.grade : ''}</span>
                        </div>
                        <div className="right">
                        <button className="material-icons" onClick={() =>{handleDeleteClick(course.c_id)} }>Remove Course</button>
                        </div>
                    </div>
                </li>
            )
        })
    
        setList(updatedList);
    },[data,cids,clickedDel,handleDeleteClick])
    
const handleSubmit = (e)=>{
    e.preventDefault();

    if(parseInt(ecookie) === parseInt(s_id)){
        const addCourse = async()=>{
            try {
                await axios.post(`http://localhost:3002/takes/add`,{
                    s_id: s_id,
                    c_id: add
                }).then(res =>{
                    setAdd('');
                    alert("Sucessfully Added");
                   
            })
            } catch (error) {
                alert("Incorrect Course ID, Please retry");
            }
        }
        addCourse();
    }else{
        alert('You Cannot add');
    }
}
    return(
        <>
        <div className="container">
            <div className="row">
                <h4 className="center">My Courses:</h4>
                <ul className="collection">
                {list}
                </ul>
                <div>
                <form onSubmit={handleSubmit}>


                Enter Course ID to add:
                    <input type="text" value={add} onChange={(e) => {setAdd(e.target.value)}} ></input>
                    <button className="col s2">Add Course</button>
                </form>
            </div>
            </div>
        </div>
        </>
    )

}

export default TakesStudent