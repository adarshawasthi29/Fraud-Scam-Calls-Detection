import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Blogcreate.css';


const Blogcreate = () => {
    const [blogForm,setBlogForm] = useState(
        {
            author:"",
            title:"",
            description:"",
            content:""
        }
    )
    const navigate = useNavigate();


    const handleSubmit = (e)=>{
        e.preventDefault();
        const submitData = async()=>{
            try {
              const response = await axios.post('http://localhost:5000/createblog',blogForm);
              navigate('/blog');
            } catch (error) {
              console.log(error);
            }
        }
        submitData();
      }

    const onChangeHandler =(e)=>{
        const {name,value} = e.target;
        setBlogForm((prevData)=>{
          return {
            ...prevData,
            [name] : value
          }
        })
      }


  return (
    <>
    <div className='blogcreate-outer'>
      <div className="blogcreate-container">
        <h1 className='blogcreate-h1'>Write a Blog</h1>
        <form className='blogcreate-form' onSubmit={handleSubmit}>
          <input
            className='blogcreate-input'
            type="text"
            placeholder='Enter your Name'
            name="author"
            value={blogForm.author}
            onChange={onChangeHandler}
            autoComplete="off"
            required
          />
          <br />
          <input
            className='blogcreate-input'
            type="text"
            placeholder='Enter Title'
            name="title"
            value={blogForm.title}
            onChange={onChangeHandler}
            autoComplete="off"
            required
          />
          <br />
          <input
            className='blogcreate-input'
            placeholder='Enter Description'
            type="text"
            name="description"
            value={blogForm.description}
            onChange={onChangeHandler}
            autoComplete="off"
            required
          />
          <br />
          <textarea
            rows={20}
            cols={120}
            className='blogcreate-input'
            placeholder='Enter your blog content '
            name="content"
            value={blogForm.content}
            onChange={onChangeHandler}
            autoComplete="off"
            required
            style={{ resize: 'none', width: '90%', maxWidth: '90%' }}
          ></textarea>
          <br />
          <div className="blogcreate-wrapper">
            <button className='blog-create-btn'>Post</button>
          </div>
        </form>
     </div>
    </div>
    </>
  )
}

export default Blogcreate;
