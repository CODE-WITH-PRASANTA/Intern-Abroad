import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./AddPost.css";
import axiosInstance from "../../Utils/Api"; // Import axios instance

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    keywords: "",
    tags: "",
    optionalUrl: "",
    content: "",
    headContent: "",
    imageUrl: "",
    imagePreview: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });
  
    if (formData.imagePreview) {
      const blob = await fetch(formData.imagePreview).then((res) => res.blob());
      formDataToSubmit.append("image", blob, "uploaded-image.jpg");
    }
  
    try {
      const response = await axiosInstance.post("/posts/create", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 200) {
        alert("Post added successfully");
      } else {
        console.error("Server Error:", response.data);
        alert(`Error: ${response.data?.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        alert(
          `Error: ${error.response.status} - ${
            error.response.data?.error || "An unexpected error occurred"
          }`
        );
      } else if (error.request) {
        // No response received from the server
        alert("No response received from the server. Please try again later.");
      } else {
        // Something else went wrong
        alert(`Error: ${error.message}`);
      }
    }
  };
  

  return (
    <div className="add-post-container">
      <h1 className="page-title">Add Post</h1>
      <div className="main-layout">
        {/* Left Section */}
        <form className="post-form" onSubmit={handleSubmit}>
          {["title", "slug", "summary", "keywords", "tags", "optionalUrl"].map((field) => (
            <div className="form-section" key={field}>
              <label htmlFor={field}>{field.replace(/([A-Z])/g, " $1").toUpperCase()}</label>
              <input
                type="text"
                id={field}
                name={field}
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleInputChange}
              />
            </div>
          ))}
          
          {/* Content field replaced with TinyMCE editor */}
          <div className="form-section">
            <label htmlFor="content">Content</label>
            <Editor
                apiKey="p5ob9ls7zt44cj3jn7ojq3tam1vzegkshlkvsf4x5et303rx" // Replace with your TinyMCE free API key
                value={formData.content}
                init={{
                  plugins: [
                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link',
                    'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                }}
                onEditorChange={(newContent) => setFormData({ ...formData, content: newContent })}
              />

          </div>

          <div className="publish-section">
            <button type="button">Save as Draft</button>
            <button type="submit">Add Post</button>
          </div>
        </form>

        {/* Right Section */}
        <div className="head-post-section">
          <h2>Head Post</h2>
          <div className="form-section">
            <label htmlFor="imageInput">Main Post Image</label>
            <div className="image-upload">
              <input type="file" id="imageInput" accept="image/*" onChange={handleImageUpload} />
              <label htmlFor="imageInput" className="image-upload-label">
                {formData.imagePreview ? (
                  <img src={formData.imagePreview} alt="Preview" className="image-preview" />
                ) : (
                  "Upload Image"
                )}
              </label>
            </div>
          </div>
          <div className="form-section">
            <label htmlFor="imageUrl">Add Image URL</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              placeholder="Paste image URL here"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="form-section">
            <label htmlFor="headContent">Head Content</label>
            <textarea
              id="headContent"
              name="headContent"
              placeholder="Write head content here"
              value={formData.headContent}
              onChange={handleInputChange}
            />
          </div>
          <button type="button" className="save-head-post-btn">
            Save Head Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
