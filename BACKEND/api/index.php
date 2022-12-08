<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;
require __DIR__ . '/../vendor/autoload.php';
 
const JWT_SECRET = "makey1234567";

$app = AppFactory::create();

function createJwT (Response $response) : Response {

    $issuedAt = time();
    $expirationTime = $issuedAt + 60;
    $payload = array(
    'userid' => '1',
    'email' => 'victor.larmet@gmail.com',
    'pseudo' => 'spartan5497',
    'iat' => $issuedAt,
    'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
}

$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello","/api/login","/api/client"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

function  addHeaders (Response $response) : Response {
    $response = $response
    ->withHeader("Content-Type", "application/json")
    ->withHeader('Access-Control-Allow-Origin', ('https://met02web.onrender.com'))
    ->withHeader('Access-Control-Allow-Headers', 'Content-Type,  Authorization')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    ->withHeader('Access-Control-Expose-Headers', 'Authorization');

    return $response;
}


$app->get('/api/clients', function (Request $request, Response $response, $args) {   
    $response->getBody()->write(json_encode($response));

    return $response;
});



// APi d'authentification générant un JWT
$app->post('/api/login', function (Request $request, Response $response, $args) {   
    $err=false;
    $inputJSON = file_get_contents('php://input');
    $body = json_decode( $inputJSON, TRUE ); //convert JSON into array

    $login = $body ['login'] ?? "";
    $pass = $body ['password'] ?? "";

    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$login))   {
        $err = true;
    }
    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$pass))  {
        $err=true;
    }

    if (!$err) {
            $response = createJwT ($response);
            $response = addHeaders($response);
            $data = array('login' => $login, 'password' => $pass);
            $response->getBody()->write(json_encode($data));
     } else {          
            $response = $response->withStatus(401);
     }
    return $response;
});


$app->post('/api/client', function (Request $request, Response $response, $args) {   
    

    $inputJSON = file_get_contents('php://input');
    $body = json_decode( $inputJSON, TRUE ); //convert JSON into array
    $lastName = $body ['lastName'] ?? ""; 

    $response = addHeaders($response);


    $array = array('lastName' => $lastName);


    $response->getBody()->write($array);


    return $response;

});





$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run ();