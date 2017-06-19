 <?php

$token = '867120871298748416-UQQfueGUFpTO0zIF7Ev1wkFsrjUMr0e';
$token_secret = 'm988K4uV65NURzRmsqYPgOFT9wHhrrYkcsyPcpqqRP4vH';
$consumer_key = 'RwQ1SS2YPLZmOd91p4syC6I8t';
$consumer_secret = '5gspMIgnwFVMdAyalIqoRcZHVjOvW8vdEwgfYbYEn1IJhxGtJo';

require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

$connection = new TwitterOAuth( $consumer_key, $consumer_secret, $token, $token_secret );

$connection->host = "https://api.twitter.com/1.1/";
$connection->ssl_verifypeer = TRUE;
$connection->content_type = 'application/x-www-form-urlencoded';

// $tweets = $connection->get('https://api.twitter.com/1.1/search/tweets.json?q=%23test&result_type=recent');
$tweets = $connection->get('search/tweets', ["q" => $_GET['q'], "result_type" => "recent", "count" => $_GET['count'] ]);
// and var_dump($tweets);

echo json_encode($tweets);

//
// require "twitteroauth/autoload.php";
// use Abraham\TwitterOAuth\TwitterOAuth;
//
// $params = [
//     'q' => (isset($_GET['q']) ? $_GET['q'] : '')
// ];
//
// define('CONSUMER_KEY', 'RwQ1SS2YPLZmOd91p4syC6I8t');
// define('CONSUMER_SECRET', '5gspMIgnwFVMdAyalIqoRcZHVjOvW8vdEwgfYbYEn1IJhxGtJo');
// define('ACCESS_TOKEN', '867120871298748416-UQQfueGUFpTO0zIF7Ev1wkFsrjUMr0e');
// define('ACCESS_TOKEN_SECRET', 'm988K4uV65NURzRmsqYPgOFT9wHhrrYkcsyPcpqqRP4vH');
//
// $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
// $content = $connection->get("account/verify_credentials");
//
//
// $data = $connection->get("search/tweets", $params);
//
// header('Content-Type: application/json');
// echo json_encode($data);
