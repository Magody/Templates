<?php

$name = $json_input['name']?? null;
$email = $json_input['email']?? null;
$category = $json_input['category']?? null;
$message = $json_input['message']?? null;


if(isNotNullData([$name, $email, $category, $message])){
    $contact_form = new ContactForm(-1, $name, $email, $category, $message);
    $response = $contact_form->create($connection);  
}else{
    exit();
}