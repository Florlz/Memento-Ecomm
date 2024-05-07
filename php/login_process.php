<?php
// Start session to manage user authentication
session_start();

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "memento";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$error_message = ""; // Initialize error message variable

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve username and password from the form
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare SQL statement to check user credentials
    $sql = "SELECT * FROM users WHERE username = ?";
    
    // Use prepared statement to prevent SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    // If user exists, verify password
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // Verify hashed password
        if (password_verify($password, $row['password'])) {
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $username;
            echo 'success'; // Echo 'success' to indicate successful login
            exit;
        } else {
            // Invalid password, set error message
            echo 'Invalid username or password'; // Echo error message
            exit;
        }
    } else {
        // User not found, set error message
        echo 'Invalid username or password'; // Echo error message
        exit;
    }
}

// Close database connection
$conn->close();
?>