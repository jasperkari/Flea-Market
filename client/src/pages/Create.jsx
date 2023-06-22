/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import TopNav from '../components/TopNav';

function Create() {
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    formData.append('username', username);
    fetch('http://localhost:3002/products/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setSubmissionStatus('Success!');
        } else {
          setSubmissionStatus('Error submitting form.');
        }
      })
      .catch(() => {
        setSubmissionStatus('Error submitting form.');
      });
  };

  return (
    <div>
      <TopNav />
      <div>
        <h1>Create a Flea Market Item</h1>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="image">Image:</label>
          <br />
          <input type="file" id="image" name="image" />
          <br />
          <br /> */}
          <label htmlFor="name">Name:</label>
          <br />
          <input type="text" id="name" name="name" />
          <br />
          <br />
          <label htmlFor="price">Price:</label>
          <br />
          <input type="number" id="price" name="price" />
          <br />
          <br />
          <label htmlFor="description">Description:</label>
          <br />
          <textarea id="description" name="description" />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
        {submissionStatus && (
          <>
            <br />
            {submissionStatus}
            <br />
            <br />
          </>
        )}
      </div>
    </div>
  );
}

export default Create;
