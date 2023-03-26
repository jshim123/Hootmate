<?php
$user = $_POST['user'];
$question = $_POST['question'];
session_start();
$email = $_SESSION["email"];

$host="localhost";
$dbname = "forum_db";
$usermame = "root";
$password = "";

$conn = mysqli_connect($host,$usermame,$password,$dbname);
if(mysqli_connect_errno()){
    die("Connection error: " . mysqli_connect_error());
}

$sql = "INSERT INTO post (user,question, mail) VALUES(?,?,?)";
$stmt = mysqli_stmt_init($conn);
if(!mysqli_stmt_prepare($stmt,$sql)){
    die(mysqli_error($conn));
}

mysqli_stmt_bind_param($stmt, "sss", $user, $question, $email);
mysqli_stmt_execute($stmt);

echo "Successfull entry!";
header( "refresh:3;url=community.php" );
?>