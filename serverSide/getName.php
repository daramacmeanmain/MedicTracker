<?php
	session_start();
	header('Access-Control-Allow-Origin: *');
	
	// Define database connection parameters
	$hn 		= 'localhost';
	$un 		= 'root';
	$pwd		= '';
	$db 		= 'medbase';
	$cs 		= 'utf8';
	
	define('DB_SERVER', 'localhost');
	define('DB_USERNAME', 'root');
	define('DB_PASSWORD', '');
	define('DB_DATABASE', 'medbase');
	$connection = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

	$dsn 	= "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
	$opt 	= array(
						PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
						PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
						PDO::ATTR_EMULATE_PREPARES   => false,
					   );
					   
	$pdo 	= new PDO($dsn, $un, $pwd, $opt);
	$data   = array();
	
	if (isset($_REQUEST['username'])){
		$_SESSION['session_username'] = $_REQUEST['username'];
	}
		
	if (isset($_REQUEST['password'])){
		$_SESSION['session_password'] = $_REQUEST['password'];
	}

	if (isset($_SESSION['session_username'])){
		$username = $_SESSION['session_username'];
	}

	if (isset($_SESSION['session_password'])){
		$password = $_SESSION['session_password'];
	}
	
	try {
	  $stmt 	= $pdo->query("select name from user_table where username = '$username' and password = '$password'");
	  while($row  = $stmt->fetch(PDO::FETCH_OBJ))
	  {
		 $uData[] = $row;
	  }

	  echo json_encode($uData);
	}
	catch(PDOException $e)
	{
	  echo $e->getMessage();
	}
?>