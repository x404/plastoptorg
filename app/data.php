<?
function clearData($data){
	$data = trim(strip_tags($data));
	return $data ;	
}

function _fixed_name($name) {
    return str_replace(array(chr(32), chr(46), chr(91)/*, chr(128), chr(129), chr(130), chr(131), chr(132), chr(133), chr(134), chr(135), chr(136), chr(137), chr(138), chr(139), chr(140), chr(141), chr(142), chr(143), chr(144), chr(145), chr(146), chr(147), chr(148), chr(149), chr(150), chr(151), chr(152), chr(153), chr(154), chr(155), chr(156), chr(157), chr(158), chr(159)*/), '_', $name);
}

$email='kronos2003@gmail.com';
?>	