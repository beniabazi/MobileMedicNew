<?php
// Handle form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['bookingForm'])) {
    // Capture form data
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $location = $_POST['location'];
    $issue = $_POST['issue'];
    $date = $_POST['date'];
    $time = $_POST['time'];

    // Email settings
    $to = 'admin@mobilemedic.au';
    $subject = 'New Booking Request';
    $message = "You have received a new booking request:\n\n" .
               "Name: $name\n" .
               "Phone: $phone\n" .
               "Repair Location: $location\n" .
               "Issue: $issue\n" .
               "Preferred Date: $date\n" .
               "Preferred Time: $time";

    // Set email headers
    $headers = 'From: noreply@mobilemedic.au' . "\r\n" .
               'Reply-To: ' . $phone . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    // Send email and display message
    if (mail($to, $subject, $message, $headers)) {
        $bookingStatus = 'Your booking request has been sent successfully!';
    } else {
        $bookingStatus = 'There was a problem sending your booking request.';
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Form</title>
</head>
<body>

<?php
// Display the result of the booking form submission
if (isset($bookingStatus)) {
    echo "<p>$bookingStatus</p>";
}
?>

<h2>Booking Form</h2>
<form method="POST" action="">
  <input type="hidden" name="bookingForm" value="1"> <!-- Hidden field to identify the form -->
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>

  <label for="phone">Phone Number:</label>
  <input type="tel" id="phone" name="phone" required>

  <label for="location">Repair Location:</label>
  <input type="text" id="location" name="location" required>

  <label for="issue">Describe the Issue:</label>
  <textarea id="issue" name="issue" required></textarea>

  <label for="date">Preferred Date:</label>
  <input type="date" id="date" name="date" required>

  <label for="time">Preferred Time:</label>
  <input type="time" id="time" name="time" required>

  <button type="submit">Submit Booking</button>
</form>

</body>
</html>
