<?php
$email = $_POST['email'];
$pw = $_POST['pw'];

$host="localhost";
$dbname = "users_db";
$usermame = "root";
$password = "";

$conn = mysqli_connect($host,$usermame,$password,$dbname);
if(mysqli_connect_errno()){
    die("Connection error: " . mysqli_connect_error());
}

$query = mysqli_query($conn, "SELECT * FROM user WHERE email='".$email."' AND pw='".$pw."'");
if (!$query)
{
    die('Error: ' . mysqli_error($conn));
}

if(mysqli_num_rows($query) > 0){
    echo "Login Successful. Redirecting to Home page.";
    header( "refresh:3;url=index.html" );
}else{
    echo "Wrong email/password or user does not exist. Try again.<br/>";
    echo "Redirecting to Home page.";
    header( "refresh:3;url=index.html");
}
// Start the session
session_start();
// Store the email in a session variable
$_SESSION['email'] = $email;
?>