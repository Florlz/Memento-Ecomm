<?php
session_start();

$response = array();

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
    $response['loggedin'] = true;
    $response['username'] = $_SESSION['username'];

    // Assuming you have already connected to your database
    $servername = "localhost"; // Change this if your database is hosted elsewhere
    $username = "root"; // Change this to your database username
    $password = ""; // Change this to your database password
    $dbname = "memento"; // Change this to your database name

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare statement
    $stmt = $conn->prepare("SELECT profile_picture FROM users WHERE username = ?");
    $stmt->bind_param("s", $_SESSION['username']); // "s" indicates the username is a string

    // Execute statement
    $stmt->execute();

    // Get result
    $result = $stmt->get_result();

    // Check if query was successful
    if ($result->num_rows > 0) {
        // Fetch profile picture URL
        $row = $result->fetch_assoc();
        $response['profile_picture'] = $row['profile_picture'];
    } else {
        // Profile picture not found, set to default or handle error
        $response['profile_picture'] = "default_profile_picture.jpg";
    }

    // Close statement
    $stmt->close();

    // Close connection
    $conn->close();
} else {
    $response['loggedin'] = false;
}

echo json_encode($response);
?>
