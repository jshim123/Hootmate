<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Forum</title>
    <link rel="stylesheet" href="styleCommunity.css">
</head>
<body>
    <div class="forum-container">
        <h1>Student Forum</h1>
        <form id="question-form" method="post" action="communityPHP.php">
            <label for="user">Username:</label>
            <input type="text" name="user" id="user" placeholder="Your username" required>
            <label for="question">Question:</label>
            <textarea id="question" name="question" rows="4" placeholder="Type your question..." required></textarea>
            <button type="submit">Post Question</button>
        </form>
    </div>

    <style>
        .post {
        max-width: 800px;
        margin: 50px auto;
        padding: 20px;
        border-radius: 10px;
        background-color: #ffffff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid black;
    margin-bottom: 10px;
    overflow: hidden;
    }

.left-col {
    float: left;
    width: 50%;
}

.right-col {
    float: right;
    width: 50%;
    text-align: right;
}

.clear {
    clear: both;
}

.post p {
    margin: 0;
    padding: 5px;
}

.post p:last-child {
    margin-top: 10px;
}

</style>

<?php
    echo '<link rel="stylesheet" href="styleCommunity.css">';

    $host="localhost";
    $dbname = "forum_db";
    $username = "root";
    $password = "";

    $conn = mysqli_connect($host,$username,$password,$dbname);
    if(mysqli_connect_errno()){
        die("Connection error: " . mysqli_connect_error());
    }

    $sql = "SELECT postnum, user, question, mail FROM post ORDER BY postnum DESC";
    $result = mysqli_query($conn, $sql);

    if(mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $user = $row['user'];
            $question = $row['question'];
            $postnum = $row['postnum'];
            $mail = $row['mail'];
            echo "<div class='post'>";
            echo "<div class='left-col'>";
            echo "<p>User: $user</p>";
            echo "</div>";
            echo "<div class='right-col'>";
            echo "<p>Post Number: $postnum</p>";
            echo "</div>";
            echo "<div class='clear'></div>"; // Clear the floats
            echo "<p>Question: $question</p>";
            echo "<p>Email: <a href='mailto:$mail'>$mail</a></p>";
            echo "</div>";
        }
    } else {
        echo "No posts found.";
    }

    mysqli_close($conn);
?>

</body>
</html>