<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Load PHPMailer
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Allow only POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit;
}

// Sanitize all inputs safely
function clean($value) {
    return htmlspecialchars(trim($value ?? ""), ENT_QUOTES, 'UTF-8');
}

$name        = clean($_POST['name']       ?? "");
$email       = clean($_POST['email']      ?? "");
$contact     = clean($_POST['contact']    ?? "");
$service     = clean($_POST['service']    ?? "");
$opportunity = clean($_POST['opportunity']?? "");
$pincode     = clean($_POST['pincode']    ?? "");
$state       = clean($_POST['state']      ?? "");
$message     = clean($_POST['message']    ?? "");

// BASIC VALIDATION
if ($name === "" || $email === "") {
    echo json_encode(["success" => false, "message" => "Name and Email are required."]);
    exit;
}

// Initialize PHPMailer
$mail = new PHPMailer(true);

try {
    // SMTP CONFIG
    $mail->isSMTP();
    $mail->Host       = 'smtp.hostinger.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@trackshiplogistics.com';
    $mail->Password   = 'Tr@kship9960';  // Change this ASAP!
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    // SENDER + RECEIVER
    $mail->setFrom('info@trackshiplogistics.com', 'Trackship Leads');
    $mail->addAddress('sohailindiabuys@gmail.com');

    // EMAIL CONTENT
    $mail->isHTML(true);
    $mail->Subject = "📩 New Trackship Lead Submission";

    $mail->Body = "
        <h2 style='margin-bottom:8px;color:#333;'>New Trackship Lead Received</h2>
        <hr>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Contact:</strong> {$contact}</p>
        <p><strong>Service:</strong> {$service}</p>
        <p><strong>Opportunity:</strong> {$opportunity}</p>
        <p><strong>Pincode:</strong> {$pincode}</p>
        <p><strong>State:</strong> {$state}</p>
        <p><strong>Message:</strong> {$message}</p>
    ";

    // SEND EMAIL
    if ($mail->send()) {
        echo json_encode([
            "success" => true,
            "message" => "Lead submitted successfully"
        ]);
        exit;
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Failed to send email"
        ]);
        exit;
    }

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Mailer Error: {$mail->ErrorInfo}"
    ]);
    exit;
}
?>
