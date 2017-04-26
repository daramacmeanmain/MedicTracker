<?php
	session_start(); //user session
	header('Access-Control-Allow-Origin: *');

	//database parameters
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

	//retrieve data from the form
	$nMed = filter_var($_REQUEST['nMed'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	$med = filter_var($_REQUEST['med'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	$dose = filter_var($_REQUEST['dose'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	$frq = filter_var($_REQUEST['frq'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	$username = filter_var($_REQUEST['username'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	$uid = filter_var($_REQUEST['uid'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	
	// excecute update query
	try {
		$sql 	= "update med_table inner join user_table on med_table.user_id = user_table.id set med_table.med = :nMed, med_table.dose = :dose, med_table.frq = :frq where (user_table.username = :username or user_table.id = :uid) and med_table.med = :med";
		$stmt 	= $pdo->prepare($sql);
		$stmt->bindParam(':nMed', $nMed, PDO::PARAM_STR);
		$stmt->bindParam(':med', $med, PDO::PARAM_STR);
		$stmt->bindParam(':dose', $dose, PDO::PARAM_STR);
		$stmt->bindParam(':frq', $frq, PDO::PARAM_STR);
		$stmt->bindParam(':username', $username, PDO::PARAM_STR);
		$stmt->bindParam(':uid', $uid, PDO::PARAM_STR);
		$stmt->execute();
	}

	catch(PDOException $e)
	{
		echo $e->getMessage();
	}
?>