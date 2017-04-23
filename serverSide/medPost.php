<?php
	session_start();
	header('Access-Control-Allow-Origin: *');

	$hn 		= 'localhost';
	$un 		= 'root';
	$pwd		= '';
	$db 		= 'medbase';
	$cs 		= 'utf8';

	$dsn 	= "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
	$opt 	= array(
		PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
		PDO::ATTR_EMULATE_PREPARES   => false,
	);
	
	$pdo 	= new PDO($dsn, $un, $pwd, $opt);

	$data 	= array();

	$med = filter_var($_REQUEST['med'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	$dose = filter_var($_REQUEST['dose'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	$frq = filter_var($_REQUEST['frq'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	$uid = filter_var($_REQUEST['uid'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	
	try {
		$sql 	= "insert into med_table (med, dose, frq, user_id) values (:med, :dose, :frq, :uid)";
		$stmt 	= $pdo->prepare($sql);
		$stmt->bindParam(':med', $med, PDO::PARAM_STR);
		$stmt->bindParam(':dose', $dose, PDO::PARAM_STR);
		$stmt->bindParam(':frq', $frq, PDO::PARAM_STR);
		$stmt->bindParam(':uid', $uid, PDO::PARAM_STR);
		$stmt->execute();
	}
	
	catch(PDOException $e)
	{
		echo $e->getMessage();
	}
?>