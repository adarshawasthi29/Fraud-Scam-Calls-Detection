import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Blogs.css';


const Blogs = () => {
  const [blog,setBlog] = useState([]);
  const navigate = useNavigate();

  const handleCreate = () =>{
    if(localStorage.getItem('isLoggedIn')){
    navigate('/blog/create');
    }
    else{
      alert('Please LoggedIn First !');
    }
  }

  const handleClick = (id) =>{
    const findBlog = blog.find((obj)=>{
      return obj.id === id;
    })
      navigate('/blog/detail',{
        state:{
          output : findBlog
        }
    });
  }

  useEffect(()=>{
    const getBlog = async()=>{
      try {
        const response = await axios.get('http://localhost:5000/getblogs');
        console.log(response.data);
        setBlog(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getBlog();
  },[])


  const cardBlog = blog.map((obj,ind)=>{
    return (
      <div key={obj.id} className='Blog_overview'>
        <p className='Blog_title'>{obj.title}</p>
        <p className='Blog_author'>{obj.author}</p>
        <p className='Blog_desc'>{obj.description}</p>
        <button onClick={() => handleClick(obj.id)} className='Blog_button'>Read in Detail</button>
      </div>
    )
  })

  return (
    <div className='Blog_Outer_Main'>
        <div className="Blog_outer">
        <div className='Blog_Container'>
          <div className='Blog_heading'><h2>Community Blogs</h2></div>
          <div className="Blog_Main_button"><button onClick={handleCreate}>Create Post</button></div>
          {cardBlog}
        </div>
        </div>
    </div>
  )
}

export default Blogs;

