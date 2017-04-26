<?php
	session_start()//user session
	header('Access-Control-Allow-Origin: *');
	
	//database parameters
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
	
	//set session variables
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
	
	//execute query
	try {
	  $stmt 	= $pdo->query("select med_table.med, med_table.dose, round(12/med_table.frq) as frq from user_table inner join med_table on med_table.user_id = user_table.id where user_table.username = '$username' and user_table.password = '$password'");
	  while($row  = $stmt->fetch(PDO::FETCH_OBJ))
	  {
		 $data[] = $row;
	  }

	  echo json_encode($data);
	}
	catch(PDOException $e)
	{
	  echo $e->getMessage();
	}
?>