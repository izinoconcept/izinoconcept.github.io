<?php
$field_name = $_POST["name"];
$field_email = $_POST["email"];
$field_phone = $_POST["phone"];
$field_message = $_POST["message"];

$mail_to = 'i.zinoconcept@gmail.com';
$subject = 'This message is received from '.$field_name;

$body_message = 'Name: '.$field_name."\n";
$body_message .= 'E-mail: '.$field_email."\n";
$body_message .= 'Phone: '.$field_phone."\n";
$body_message .= 'Message: '.$field_message;

$headers = 'From: '.$field_name.'<'.$field_email.'>'."\r\n" .
$headers .= 'Reply-To: '.$field_name.'<'.$field_email.'>' . "\r\n" .

$mail_status = mail($mail_to, $subject, $body_message, $headers);

if ($mail_status) { ?>
	<script language="javascript" type="text/javascript">
		alert('Thank you for the message. We will contact you shortly.');
		window.location = 'one-page.html';
	</script>
<?php
}
else { ?>
	<script language="javascript" type="text/javascript">
		alert('Message failed. Please, send an email to i.zinoconcept@gmail.com');
		window.location = 'one-page.html';
	</script>
<?php
}
?>