<?php 
/**Send Mail from app**/


use PHPMailer\PHPMailer\PHPMailer;

require_once 'PHPMailer.php';
require_once 'SMTP.php';
$email = $_POST['email'];
$messageBody = $_POST['message'];
$mailto ='info@climapesca.org';
$mail = new PHPMailer();
// multiple recipients
$mail->IsSMTP();
$mail->SMTPDebug = 0;
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'tls';
$mail->addAddress($mailto, $mailto);
$mail->Host = "in-v3.mailjet.com"; // A RELLENAR. Aquí pondremos el SMTP a utilizar. Por ej. mail.midominio.com
$mail->Username = "b8886c43a897b36676b3b769655cfbd4"; // A RELLENAR. Email de la cuenta de correo. ej.info@midominio.com La cuenta de correo debe ser creada previamente.
$mail->Password = "50e22e4d1659fb99ff5a753a1da81e98"; // A RELLENAR. Aqui pondremos la contraseña de la cuenta de correo
$mail->Port = 587; // Puerto de conexión al servidor de envio.
$mail->From = $email // A RELLENARDesde donde enviamos (Para mostrar). Puede ser el mismo que el email creado previamente.
$mail->FromName = $email; //A RELLENAR Nombre a mostrar del remitente.
$mail->IsHTML(true); // El correo se envía como HTML
$mail->Subject = "Clima Pesca Digital"; // Este es el titulo del email.
                // message
$message=$messageBody;
if ($mail->ValidateAddress($mailto)) {
    $mail->Body = $message;
    $done = $mailx->Send();
}
