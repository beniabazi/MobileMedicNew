<?php
// Handle form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['mailInForm'])) {
    // Capture form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $device = $_POST['device'];
    $issue = $_POST['issue'];
    $address = $_POST['address'];

    // Email settings
    $to = 'admin@mobilemedic.au';
    $subject = 'New Mail-In Repair Request';
    $message = "You have received a new mail-in repair request:\n\n" .
               "Name: $name\n" .
               "Email: $email\n" .
               "Phone: $phone\n" .
               "Device: $device\n" .
               "Issue: $issue\n" .
               "Return Address: $address";

    // Set email headers
    $headers = 'From: noreply@mobilemedic.au' . "\r\n" .
               'Reply-To: ' . $email . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    // Send email and display message
    if (mail($to, $subject, $message, $headers)) {
        $mailInStatus = 'Your mail-in request has been sent successfully!';
    } else {
        $mailInStatus = 'There was a problem sending your mail-in request.';
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mail-In Form</title>
</head>
<body>

<?php
// Display the result of the mail-in form submission
if (isset($mailInStatus)) {
    echo "<p>$mailInStatus</p>";
}
?>

<h2>Mail-In Repair Form</h2>
<form method="POST" action="">
  <input type="hidden" name="mailInForm" value="1"> <!-- Hidden field to identify the form -->
  <label for="name">Name:</label>
  <input type="text" id="mailInName" name="name" required>

  <label for="email">Email:</label>
  <input type="email" id="mailInEmail" name="email" required>

  <label for="phone">Phone Number:</label>
  <input type="tel" id="mailInPhone" name="phone" required>

  <label for="device">Device Model:</label>
  <input type="text" id="device" name="device" required>

  <label for="issue">Describe the Issue:</label>
  <textarea id="mailInIssue" name="issue" required></textarea>

  <label for="address">Return Address:</label>
  <input type="text" id="mailInAddress" name="address" required>

  <button type="submit">Submit Mail-In Request</button>
</form>

</body>
</html>
