<?php
header("Content-Type: application/json");
$db = new SQLite3("books.db");

// Get search parameters
$title = isset($_GET['title']) ? trim($_GET['title']) : '';
$author = isset($_GET['author']) ? trim($_GET['author']) : '';

// Build SQL query
$query = "SELECT * FROM books";
$conditions = [];

if (!empty($title)) {
    $conditions[] = "title LIKE :title";
}
if (!empty($author)) {
    $conditions[] = "author LIKE :author";
}

// Append conditions if search parameters exist
if (!empty($conditions)) {
    $query .= " WHERE " . implode(" AND ", $conditions);
}

$stmt = $db->prepare($query);

// Bind parameters dynamically
if (!empty($title)) {
    $stmt->bindValue(':title', "%$title%", SQLITE3_TEXT);
}
if (!empty($author)) {
    $stmt->bindValue(':author', "%$author%", SQLITE3_TEXT);
}

$result = $stmt->execute();
$books = [];

while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $books[] = $row;
}

echo json_encode($books);
?>
