<?php
// Start session to manage user authentication
session_start();

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

// Initialize user data variable
$user_data = array();

// Retrieve username from session
if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];

    // Prepare statement
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username); // "s" indicates the username is a string

    // Execute statement
    $stmt->execute();

    // Get result
    $result = $stmt->get_result();

    // Check if query was successful
    if ($result->num_rows > 0) {
        // Fetch user data as an associative array
        $user_data = $result->fetch_assoc();
    } else {
        // Handle error - user not found
        $user_data['error'] = 'User not found';
    }

    // Close statement
    $stmt->close();
} else {
    // Handle error - username not found in session
    $user_data['error'] = 'Username not found in session';
}

// Return user data as JSON
echo json_encode($user_data);

// Close connection
$conn->close();
?>
