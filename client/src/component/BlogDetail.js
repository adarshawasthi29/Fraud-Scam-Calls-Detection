import React from 'react';
import { useLocation } from 'react-router-dom';
import './BlogDetails.css';


const Blogdetail = () => {

    const location = useLocation();
    const blog = location.state.output;

  return (
    <div className='blog-detail-main'>
      <div className='blog-detail-outer'>
        <div className='blog-detail-container'>
          <p className='blog-detail-title'>{blog.title}</p>
          <p className='blog-detail-desc'>{blog.description}</p>
          <p className='blog-detail-content'>{blog.content}</p>
          <p className='blog-detail-author'>~{blog.author}</p>
        </div>
      </div>
    </div>
  )
}

export default Blogdetail