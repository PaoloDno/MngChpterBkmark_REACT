import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Add(){

  const navigate = useNavigate();

  const [bookmark, setBookmark] = useState({
    manga_title : '',
    chapter_number : '',
    genre: ''
    });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setBookmark({ ...bookmark, [name] : value });
  };
 
  const handleSubmit = (event) => {

    event.preventDefault();

    if (!bookmark.manga_title || !bookmark.chapter_number || !bookmark.genre) {
      // Display an error message or take appropriate action
      console.error('Please fill in all required fields');
      return;
    }

    fetch('http://localhost/manganovelbookmark/manganovelbookmark/api/action.php', {
      //mode: 'no-cors',
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'Accept': 'application/json'
      },
      body : JSON.stringify(bookmark)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response Data:", data);
      navigate('/');
    })
  };
   
  return(
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-md-6">Add bookmark</div>
          <div className="col-md-6">
          <Link to="/" className="btn btn-success btn-sm float-end"> View List </Link>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">&nbsp;</div>
          <div className="col-md-4">
            <form method='POST' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>Manga Title</label>
                <input type="text" name="manga_title" className="form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label>Manga chapter</label>
                <input type="number" name="chapter_number" className="form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label>
                  Select an option:
                  <select name="genre" onChange={handleChange}>
                    <option value="">Select a genre</option>
                    <option  value="Action">Action</option>
                    <option  value="Advanture">Adventure</option>
                    <option  value="Romance">Romance</option>
                    <option  value="Fantasy">Fantasy</option>
                  </select>
                </label>
              </div>
              <div className="mb-2">
                <input type='submit' className='btn btn-primary' value="Add"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;