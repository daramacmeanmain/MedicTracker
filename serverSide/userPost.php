<?php
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

	$name = filter_var($_REQUEST['name'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	$username = filter_var($_REQUEST['username'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	$password = filter_var($_REQUEST['password'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	
	try {
		$sql 	= "INSERT INTO user_table(name, username, password) VALUES(:name, :username, :password)";
		$stmt 	= $pdo->prepare($sql);
		$stmt->bindParam(':name', $name, PDO::PARAM_STR);
		$stmt->bindParam(':username', $username, PDO::PARAM_STR);
		$stmt->bindParam(':password', $password, PDO::PARAM_STR);
		$stmt->execute();
	}
	
	catch(PDOException $e)
	{
		echo $e->getMessage();
	}
?>