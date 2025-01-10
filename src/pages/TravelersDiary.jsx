import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/traveldiary.css'; // Import updated CSS styles

const TravelersDiary = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [diaries, setDiaries] = useState([]);

  // Fetch all diaries
  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get('/api/posts'); // Backend API to fetch diaries
        setDiaries(response.data);
      } catch (error) {
        console.error('Error fetching diaries:', error);
      }
    };
    fetchDiaries();
  }, []);

  // Handle form submission to create a new diary
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post('/api/posts', formData); // Backend API to create a diary
      setDiaries([...diaries, response.data]);
      setTitle('');
      setContent('');
      setImage(null);
      alert('Diary created successfully!');
    } catch (error) {
      console.error('Error creating diary:', error);
      alert('Failed to create diary');
    }
  };

  // Render diary cards
  const renderDiaries = () => {
    return diaries.map((diary) => (
      <div key={diary._id} className="diary-card">
        {diary.image && <img src={diary.image} alt={diary.title} />}
        <div className="card-content">
          <h3>{diary.title}</h3>
          <p>{diary.content}</p>
          <span className="author-info">
            <i className="ri-user-line"></i> {diary.author?.username || 'Anonymous'}
          </span>
          <a href={`/diaries/${diary._id}`} className="read-more">
            Read More
          </a>
        </div>
      </div>
    ));
  };

  return (
    <div className="travelers-diary">
      <div className="create-diary">
        <h2>Create a New Diary Entry</h2>
        <form onSubmit={handleSubmit} className="diary-form">
          <input
            type="text"
            placeholder="Diary Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your story here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
          <button type="submit">Publish</button>
        </form>
      </div>
      <div className="view-diaries">
        <h2>Travel Diaries</h2>
        <div className="diaries-container">{renderDiaries()}</div>
      </div>
    </div>
  );
};

export default TravelersDiary;
