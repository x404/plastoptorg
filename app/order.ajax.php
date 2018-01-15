<?
include("data.php");
$subject="Заказ - Пластопторг";

$obj = json_decode($_POST['strorder'], true);


if (array_key_exists('name', $obj)) {
	$name = "<p>Имя: <strong>".clearData($obj['name'])."</strong></p>";
};
if (array_key_exists('email', $obj)) {
	$fromemail = "<p>E-mail: <strong>".clearData($obj['email'])."</strong></p>";
};
if (array_key_exists('tel', $obj)) {
	$tel = "<p>Телефон: <strong>".clearData($obj['tel'])."</strong></p>";
};
if (array_key_exists('msg', $obj)) {
	$msg = "<p>Сообщение: <strong>".clearData($obj['msg'])."</strong></p>";
};

$user = $name.$fromemail.$tel.$msg;

//products
$tr = '';
if (count($obj['Products'])){
	foreach ($obj['Products'] as $key => $value) {
		$tds ='';
		foreach ($value as $key => $param) {
			$centerstart = '';
			$centerend = '';
			if ($key == 'thickness' || $key == 'size' || $key == 'color' || $key = 'brand'){
				$centerstart = '<center>';
				$centerend = '</center>';
			};

			$tds .= '<td>'.$centerstart.$param.$centerend.'</td>';
		}
		$tr .= '<tr>'.$tds.'</tr>';
	};
	$products = '<h3>Продукция:</h3><table cellpadding="10" cellspacing="0" width="600px" border="1"><tr><th>Тип</th><th>Толщина</th><th>Размер</th><th>Цвет</th><th>Торговая марка</th></tr> '.$tr.'</table><br/><br/>';
};


// accessories
$tr = '';
if (count($obj['Accessories'])){
	foreach ($obj['Accessories'] as $key => $value) {
		$tds ='';
		foreach ($value as $key => $param) {
			$centerstart = '';
			$centerend = '';
			if ($key == 'cnt'){
				$centerstart = '<center>';
				$centerend = '</center>';
			}
			$tds .= '<td>'.$centerstart.$param.$centerend.'</td>';
		}
		$tr .= '<tr>'.$tds.'</tr>';
	};
	$accessories = '<h3>Комплектующие:</h3><table cellpadding="10" cellspacing="0" width="600px" border="1"><tr><th>Название</th><th>Количество</th></tr> '.$tr.'</table><br/><br/>';
};


$body = '<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <style>
        p{
        	margin: 0
        }
        table{
        	width: 600px;
			border-collapse: collapse			
        }

        td, th{
			border: 1px solid #000;
			padding: 5px;
        }

        .text-center{
        	text-align: center;
        }
        </style>
	</head>
	<body>
        '.
        $user.$products.$accessories.
    '</body></html>';


	if ( !empty( $_FILES['file']['tmp_name'] ) and $_FILES['file']['error'] == 0 ) {
		$filepath = $_FILES['file']['tmp_name'];
		$filename = $_FILES['file']['name'];
	} else {
		$filepath = '';
		$filename = '';
	}
 
send_mail($email, $body, $fromemail, $filepath, $filename);


// Вспомогательная функция для отправки почтового сообщения с вложением
function send_mail($to, $body, $email, $filepath, $filename)
{
	$subject = 'Заказ с сайта plastoptorg';
	$boundary = "--".md5(uniqid(time())); // генерируем разделитель
	$headers = "From: ".$email."\r\n";   
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .="Content-Type: multipart/mixed; boundary=\"".$boundary."\"\r\n";
	$multipart = "--".$boundary."\r\n";
	$multipart .= "Content-type: text/html; charset=\"utf-8\"\r\n";
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
	mail($to, $subject, $multipart, $headers);
}
?>