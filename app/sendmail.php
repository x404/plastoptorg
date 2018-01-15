 <?php

$admin = 'info@proverstka.com.ua';

if ( isset( $_POST['sendMail'] ) ) {
  $name  = substr( $_POST['name'], 0, 64 );
  $email   = substr( $_POST['email'], 0, 64 );
 // $subject = substr( $_POST['subject'], 0, 64 );
  $message = substr( $_POST['message'], 0, 250 );
 

  if ( !empty( $_FILES['file']['tmp_name'] ) and $_FILES['file']['error'] == 0 ) {
    $filepath = $_FILES['file']['tmp_name'];
    $filename = $_FILES['file']['name'];
  } else {
    $filepath = '';
    $filename = '';
  }
 
  $body = "АВТОР:\r\n".$name."\r\n\r\n";
  $body .= "E-MAIL:\r\n".$email."\r\n\r\n";
  //$body .= "ТЕМА:\r\n".$subject."\r\n\r\n";
  $body .= "СООБЩЕНИЕ:\r\n".$message;
 
  if ( send_mail($admin, $body, $email, $filepath, $filename) )
	  echo ("true");
  //  $_SESSION['success'] = true;
  else
	   echo ("false"); 
    //$_SESSION['success'] = false;
  //header( 'Location: '.$_SERVER['PHP_SELF'] );
  //die();
}

// Вспомогательная функция для отправки почтового сообщения с вложением
function send_mail($admin, $body, $email, $filepath, $filename)
{
  $subject = ' Заполнена форма на сайте';
  $boundary = "--".md5(uniqid(time())); // генерируем разделитель
  $headers = "From: info@proverstka.com.ua\r\n";   
  $headers .= "Return-path: <".$email.">\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .="Content-Type: multipart/mixed; boundary=\"".$boundary."\"\r\n";
  $multipart = "--".$boundary."\r\n";
  $multipart .= "Content-type: text/plain; charset=\"utf-8\"\r\n";
  $multipart .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";

  $body = $body."\r\n\r\n";
 
  $multipart .= $body;
 
  $file = '';
  if ( !empty( $filepath ) ) {
    $fp = fopen($filepath, "r");
    if ( $fp ) {
      $content = fread($fp, filesize($filepath));
      fclose($fp);
      $file .= "--".$boundary."\r\n";
      $file .= "Content-Type: application/octet-stream\r\n";
      $file .= "Content-Transfer-Encoding: base64\r\n";
      $file .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n";
      $file .= chunk_split(base64_encode($content))."\r\n";
    }
  }
  $multipart .= $file."--".$boundary."--\r\n";

  if( mail($admin, $subject, $multipart, $headers) )
    return true;
  else
    return false;
}

?>




<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<title>Отправить письмо</title>
<link rel="stylesheet" type="text/css" href="/form.css">
</head>
<body>

<form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="POST" enctype="multipart/form-data">
<h3>Закажите бесплатный расчет</h3>
<p>
	<label>Имя*:</label>
	<span class="wpcf7-form-control-wrap your-name">
		<input name="name" value="" size="40" type="text" />
	</span>
</p>

<p>	
	<label>Контактный номер*:</label>
	<span class="wpcf7-form-control-wrap tel-354">
		<input name="tel" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-tel required wpcf7-validates-as-tel" type="tel">
	</span>
</p>

<p>
	<label>E-mail:</label>
	<span class="wpcf7-form-control-wrap your-email">
		<input name="email" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-email" type="email">
	</span>
</p>

<p>
	<label>Тип конструкции:</label>
	<span class="wpcf7-form-control-wrap text-151">
		<input name="typec" value="" size="40" class="wpcf7-form-control wpcf7-text" type="text">
	</span>
</p>

<p>
	<label>Описание заказа*:</label>
	<span class="wpcf7-form-control-wrap your-message">
		<textarea name="message" cols="40" rows="10" class="wpcf7-form-control wpcf7-textarea required"> </textarea>
	</span>
</p>

<p>
	Прикрепить файл: <br>
	<span class="wpcf7-form-control-wrap file-437">
		<input name="file" value="1" size="40" class="wpcf7-form-control wpcf7-file" type="file" />
	</span>
</p>

<p><input value="Отправить" class="wpcf7-form-control wpcf7-submit" name="sendMail" type="submit"></p>

</form>


</body>
</html> 