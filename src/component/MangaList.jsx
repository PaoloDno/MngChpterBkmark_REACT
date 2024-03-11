import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Mangalist(){

  const [ bookmarks, setBookmarks ] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost/manganovelbookmark/manganovelbookmark/api/action.php';
    
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      setBookmarks(data);
    })
    .catch((error) => {
      console.error('Error:', error)
    });
  }, []);

  const handleDelete = (bm_id) => {
		if(confirm("Are your sure you want to remove it?"))
		{
			fetch(`http://localhost/manganovelbookmark/manganovelbookmark/api/action.php?bookmark_id=${bm_id}`, {
        	
        method : 'DELETE'
			})
			.then((response) => response.json())
			.then((data) => {
        console.log(data);
				setBookmarks((prevBookmark) => prevBookmark.filter((bookmark) => bookmark.bookmark_id !== bm_id));
			});
		}
	};

  return(
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="cold md-6"><b>User Data</b></div>
          <div className="cold md-6">
            <Link to="/add" className="btn btn-success btn-sm float-end"> ADD </Link>
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-border">
          <thead>
            <tr>
              <th>Title</th>
              <th>Chapter</th>
              <th>Date-Added</th>
              <th>Genre</th>
              <th>LastRead</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark, index) => (
            <tr className={`genre-color ${bookmark.genre.toLowerCase()}`} key={index}>
              <td>{bookmark.manga_title}</td>
              <td>{bookmark.chapter_number}</td>
              <td>{bookmark.timestamp_added}</td>
              <td>{bookmark.genre}</td>
              <td>{bookmark.timestamp_last_read}</td>
              <td>
                <Link to={`/edit/${bookmark.bookmark_id}`} className="btn btn-warning btn-sm"> Edit </Link>
                <button type="button" onClick={() => handleDelete(bookmark.bookmark_id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default Mangalist;
