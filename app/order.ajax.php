<?

include("data.php");

$subject="Заказ - Пластопторг";


$obj = json_decode($_POST['orders'], true);

print_r($obj);

// $body="Имя:";

// @mail($email,$subject,$body,"From:$email\r\nContent-type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit\r\n");
?>	