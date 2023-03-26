<?php
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $pw = $_POST['pw'];
    $phone = $_POST['phone'];
    
    $host="localhost";
    $dbname = "users_db";
    $usermame = "root";
    $password = "";

    $conn = mysqli_connect($host,$usermame,$password,$dbname);
    if(mysqli_connect_errno()){
        die("Connection error: " . mysqli_connect_error());
    }

    // Check if email already exists
    $query = mysqli_query($conn, "SELECT email FROM user WHERE email='".$email."'");
    if (!$query)
    {
        die('Error: ' . mysqli_error($conn));
    }

    if(mysqli_num_rows($query) > 0){
        echo "Email already exists, login instead. Redirecting to Home page.";
        header( "refresh:3;url=index.html" );
    }else{
        // Insert user data into database
        $sql = "INSERT INTO user (fname,lname,email,pw,phone) VALUES(?,?,?,?,?)";
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt,$sql)){
            die(mysqli_error($conn));
        }

        mysqli_stmt_bind_param($stmt, "sssss", $fname, $lname, $email, $pw, $phone);
        mysqli_stmt_execute($stmt);

        echo "Sign up Successful. Redirecting to Home page.";
        header( "refresh:3;url=index.html" );
    }
?>