<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

header('Content-Type: application/json');

// Validate request method
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit;
}

$name       = $_POST['name'];
$email      = $_POST['email'];
$contact    = $_POST['contact'];
$service    = $_POST['service'];
$opportunity = $_POST['opportunity'];
$pincode    = $_POST['pincode'];
$state      = $_POST['state'];
$message    = $_POST['message'];

// SEND EMAIL
$mail = new PHPMailer(true);

try {
    // SMTP Setup
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'your-email@gmail.com';
    $mail->Password   = 'your-app-password';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Sender - Receiver
    $mail->setFrom('your-email@gmail.com', 'Trackship Lead');
    $mail->addAddress('your-email@gmail.com');

    // Email content
    $mail->isHTML(true);
    $mail->Subject = "New Trackship Lead from Popup";

    $mail->Body = "
        <h3>New Lead Details</h3>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Contact:</strong> $contact</p>
        <p><strong>Service:</strong> $service</p>
        <p><strong>Opportunity:</strong> $opportunity</p>
        <p><strong>Pincode:</strong> $pincode</p>
        <p><strong>State:</strong> $state</p>
        <p><strong>Message:</strong> $message</p>
    ";

    $mail->send();

    echo json_encode(["status" => "success", "message" => "Lead submitted & email sent"]);
    exit;

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Mailer Error: {$mail->ErrorInfo}"]);
}
?>
