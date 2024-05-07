<?php

// Database connection parameters
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

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT); // Hash the password for security
    $firstName = trim($_POST["first_name"]);
    $lastName = trim($_POST["last_name"]);
    $contactNumber = trim($_POST["contact_number"]); // Assuming you added contact_number to the form
    $address = trim($_POST["address"]);

    // Perform basic validation
    $errors = [];
    if (empty($username) || empty($email) || empty($password) || empty($firstName) || empty($lastName) || empty($address)) {
        $errors[] = "All fields are required.";
    }

    // If there are no errors, perform signup process
    if (empty($errors)) {
        // Prepare and bind SQL statement
        $stmt = $conn->prepare("INSERT INTO users (username, email, password, firstname, lastname, contact_number, address) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssss", $username, $email, $password, $firstName, $lastName, $contactNumber, $address);

        // Execute the statement
        if ($stmt->execute()) {
            // Signup successful
            $response = "success";
        } else {
            // Signup failed
            $response = "Error: " . $stmt->error;
        }

        // Close statement
        $stmt->close();
    } else {
        // If there are errors, send back error messages
        $response = implode("\n", $errors);
    }

    // Send response back to the client-side JavaScript
    echo $response;
} else {
    // If accessed directly without form submission, redirect to homepage or display an error message
    // For now, let's redirect to index.html
    header("Location: index.html");
    exit();
}

// Close database connection
$conn->close();

?>
