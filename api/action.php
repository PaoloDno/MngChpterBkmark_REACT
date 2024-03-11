<?php

header("Access-Control-Allow-Origin: * ");

header("Access-Control-Allow-Headers: * ");

header("Access-Control-Allow-Methods: * ");


$password = "SECRET";

$conn = new PDO("mysql:host=127.0.0.1;dbname=testing", "root", "$password");

$method = $_SERVER['REQUEST_METHOD'];

if($method === 'GET'){

  if(isset($_GET['bookmark_id'])){ //single fetch

    $query = "SELECT * FROM manga_bookmarks WHERE bookmark_id = '" . $_GET["bookmark_id"] . "'";

    $result = $conn->query($query, PDO::FETCH_ASSOC);

    $data = array();

    foreach($result as $row) {
      $data['manga_title'] = $row['manga_title'];
      $data['chapter_number'] = $row['chapter_number'];
      $data['genre'] = $row['genre'];
      $data['bookmark_id'] = $row['bookmark_id'];
    }

    echo json_encode($data);


  } else {

  

  $query = "SELECT * FROM manga_bookmarks ORDER BY bookmark_id DESC";

  $result = $conn->query($query, PDO::FETCH_ASSOC);

  $data = array();

  foreach($result as $row) 
    {
      $data[] = $row;
    }

    
  echo json_encode($data); 
  
}
}

if ($method === 'POST') {
  $form_data = json_decode(file_get_contents('php://input'));

  // Validate input data
  if (empty($form_data->manga_title) || empty($form_data->chapter_number) || empty($form_data->genre)) {
      echo json_encode(["error" => "Invalid input. Please provide all required fields."]);
      exit;
  }

  // Prepare data for insertion
  $data = array(
      ':manga_title'    => $form_data->manga_title,
      ':chapter_number' => $form_data->chapter_number,
      ':genre'          => $form_data->genre
  );

  // Prepare and execute the SQL query
  $query = "INSERT INTO manga_bookmarks (manga_title, chapter_number, genre)
            VALUES (:manga_title, :chapter_number, :genre)";
  $statement = $conn->prepare($query);

  try {
      $statement->execute($data);
      echo json_encode(["success" => "done"]);
  } catch (PDOException $e) {
      // Handle database error
      echo json_encode(["error" => "Database error. Please try again."]);
      // Optionally, log $e->getMessage() for debugging purposes
  }
}

if($method === 'PUT'){

  $form_data = json_decode(file_get_contents('php://input'));
  
  $data = array(
      ':manga_title'     => $form_data->manga_title,
      ':chapter_number'  => $form_data->chapter_number,
      ':genre'           => $form_data->genre,
      ':bookmark_id'     => $form_data->bookmark_id
    );
  $query = " UPDATE manga_bookmarks SET manga_title = :manga_title, chapter_number = :chapter_number, genre = :genre WHERE bookmark_id = :bookmark_id ";

  $statement = $conn->prepare($query);

  $statement->execute($data);

  
  echo json_encode(["success" => "done"]);

} 

if ($method === 'DELETE') {
  // Delete Bookmark Data
  $data = array(
      ':bookmark_id' => $_GET['bookmark_id']
  );

  $query = "DELETE FROM manga_bookmarks WHERE bookmark_id = :bookmark_id";

  $statement = $conn->prepare($query);

  try {
      $statement->execute($data);
      echo json_encode(["success" => true]);
  } catch (PDOException $e) {
      // Handle database error
      echo json_encode(["error" => "Database error. Please try again."]);
      // Optionally, log $e->getMessage() for debugging purposes
  }
}


?>