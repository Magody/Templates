<?php


//Solo se muestra errores cuando se está en desarrollo
ini_set('display_errors', 1);  // se inicia
ini_set('display_startup_error', 1); //se inicia
error_reporting(E_ALL);

function isNotNullData($listData){
    $valid = true;
    for($i=0; $i<count($listData); $i++){

        if(gettype($listData[$i]) == "NULL"){
            $valid = false;
            break;
        }
    }
    return $valid;
}
$context = "api_gate";

$json_input = json_decode(file_get_contents('php://input') , true);

$route = $json_input['route']; //si está definido y tiene un valor se agrega get, sino solo raiz
$filename = $json_input['filename'];
// VALIDATION STUFF, no se debe obtener conexión hasta haber validado todo lo necesario


$context = "module_$route/$filename.php";

require_once '../../../parameters.php';
require_once '../../../models/Database.php';
require_once '../../../models/Response.php';

$database = new Database();
$connection = $database->getConnection($DATABASE_NAME);

$response = new Response(-999, "Iniciando en la puerta", 0, [], "");

if($connection == null){
    echo json_encode($response);
    exit();
}

if($route == 'contact'){
    require_once '../../../models/ContactForm.php';
    require "../../../server_api/module_contact/$filename.php";    
}
else if($route == 'testimonials'){
    require_once '../../../models/Testimonial.php';
    require "../../../server_api/module_testimonials/$filename.php";    
}


if($response->error != null){
    if(!$DEBUG_MODE)
        $response->error = "Error interno";
}
echo json_encode($response);  

$database = null;
