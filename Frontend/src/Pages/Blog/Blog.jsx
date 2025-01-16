import React, { useState, useEffect } from 'react';
import './Blog.css';
import axiosInstance from '../../Utils/Api'; // Import the axios instance

// Assets for the blog (you can remove these if using dynamic images from Cloudinary)
import blog1 from '../../assets/Blog-1.jpg';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all blogs from backend using axios
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get('/posts'); // Axios call to get posts
        setBlogs(response.data); // Store the blog data from response
        setLoading(false);
      } catch (err) {
        setError('Failed to load blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog); // Set the selected blog
    console.log(blog); // Debug: Check what data you're getting
  };

  const handleBackToList = () => setSelectedBlog(null);

  return (
    <div className="blog-page">
      {loading && <p>Loading blogs...</p>}
      {error && <p>{error}</p>}

      {!selectedBlog ? (
        <>
          <div className="blog-hero-section">
            <div className="blog-hero-content">
              <h1>Blogs & News</h1>
              <p>
                Read articles, watch videos, launches, events, news, happiness,
                and discover the iTrobes culture!
              </p>
              <div className="down-arrow">
                <span>&#x2193;</span>
              </div>
            </div>
          </div>



          <div className="blog-container">
            {blogs.map((blog) => (
              <div
                className="blog-card"
                key={blog._id} // Assuming each blog has a unique _id from the database
                onClick={() => handleBlogClick(blog)}
              >
                <img
                  src={blog.imageUrl || blog1} // Fallback to static image if no image
                  alt={blog.title}
                  className="blog-image"
                />
                <div className="blog-content">
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-head-content">{blog.headContent}</p>
                  <div className="blog-meta">
                    <span>
                      {new Date(blog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>{' '}
                    |{' '}
                    <span>{blog.company || 'Unknown Company'}</span> {/* Fallback if company is empty */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="blog-detail">
          <button onClick={handleBackToList} className="blog-back-button">
            &#x2190; Back
          </button>
          <h1 className="detail-title">{selectedBlog.title}</h1>
          <img
            src={selectedBlog.imageUrl || blog1} // Fallback to static image if no image
            alt={selectedBlog.title}
            className="blog-detail-image"
          />
          <p className="blog-summary">{selectedBlog.summary}</p>
          
          {/* Render the content with HTML tags */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{
              __html: selectedBlog.content,
            }}
          />

          <p className="blog-slug">
            <strong>Slug:</strong> {selectedBlog.slug}
          </p>
          <div className="blog-tags">
            <strong>Tags:</strong>{' '}
            {Array.isArray(selectedBlog.tags) && selectedBlog.tags.length > 0 ? (
              selectedBlog.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))
            ) : (
              <span>No tags available</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
