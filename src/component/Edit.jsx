import React, {useState, useEffect} from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

function Edit() {

  let navigate = useNavigate();

  const { bm_id } = useParams();

  const [bookmark, setBookmark] = useState({
    manga_title: '',
    chapter_number: '',
    genre: ''
  });

  const handleChange = (event) => {
    const {name , value} = event.target;

    setBookmark({
      ...bookmark,
      [name] : value
    });
  };

  const fetchUserData = () => {
    fetch(`http://localhost/manganovelbookmark/manganovelbookmark/api/action.php?bookmark_id=${bm_id}`)
    .then((response) => response.json())
    .then((data) => {           
      setBookmark(data); // Fills data is not undefined
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  
  const handleSubmit = (event) => {
    
    event.preventDefault();

    
    if (!bookmark.manga_title || !bookmark.chapter_number || !bookmark.genre) {
      // Display an error message or take appropriate action
      console.error('Please fill in all required fields');
      return;
    }
    
    fetch(`http://localhost/manganovelbookmark/manganovelbookmark/api/action.php?bookmark_id=${bm_id}`, {
      
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json',
        'Accept': 'application/json'
      },
      body : JSON.stringify(bookmark)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {  
      navigate("/");
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle the error, e.g., display a user-friendly message to the user
    });
  };
    



  return(
    <div className="card">
      <h2>{bm_id}</h2>
      <div className="card-header">
        <div className="row">
          <div className="col-md-6">Edit Bookmark: {bm_id}</div>
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
                <label>First Name</label>
                <input type="text" value={bookmark.manga_title} name="manga_title" className="form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label>Last Name</label>
                <input type="number" value={bookmark.chapter_number} name="chapter_number" className="form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label>
                  Select a Genre:
                  <select value={bookmark.genre || ''} name="genre" onChange={handleChange}>
                  <option value="">Select a genre</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Romance">Romance</option>
                  <option value="Fantasy">Fantasy</option>
                  </select>
                </label>
              </div>
              <div className="mb-2">
                <input type='submit' className='btn btn-primary' value="Edit"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}
export default Edit;