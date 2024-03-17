<?php

header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$db_user = "root";
$db_pass = null;
$db_name = "news_db";

$mysqli = new mysqli($host, $db_user, $db_pass, $db_name);

if ($mysqli->connect_error) {
    die ("Connection failed: " . $mysqli->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["title"];
    $content = $_POST["content"];

    $sql = "INSERT INTO news (title, content) VALUES ('$title', '$content')";
    if ($mysqli->query($sql) === TRUE) {
        echo "News added successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $mysqli->error;
    }
} else {
    $sql = "SELECT * FROM news";
    $result = $mysqli->query($sql);

    if ($result) {
        $news = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($news);
    } else {
        echo "Error: " . $sql . "<br>" . $mysqli->error;
    }
}

$mysqli->close();
