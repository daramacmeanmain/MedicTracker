<?php
	session_start();//user session
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

	//retrieve form data
	$med = filter_var($_REQUEST['med'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	$username = filter_var($_REQUEST['username'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	$uid = filter_var($_REQUEST['uid'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

	//execute SQL query
	try {
		$sql 	= "delete med_table.* from med_table inner join user_table on med_table.user_id = user_table.id where med_table.med = :med and (user_table.username = :username or user_table.id = :uid)";
		$stmt 	= $pdo->prepare($sql);
		$stmt->bindParam(':med', $med, PDO::PARAM_STR);
		$stmt->bindParam(':username', $username, PDO::PARAM_STR);
		$stmt->bindParam(':uid', $uid, PDO::PARAM_STR);
		$stmt->execute();
	}

	catch(PDOException $e)
	{
		echo $e->getMessage();
	}
?>