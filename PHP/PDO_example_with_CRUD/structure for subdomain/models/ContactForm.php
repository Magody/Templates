<?php

require_once 'Response.php';

class ContactForm {



    private $id;
    private $name;
    private $email;
    private $contact_category_id;
    private $message;

    public function __construct($id, $name, $email, $contact_category_id, $message){
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->contact_category_id = $contact_category_id;
        $this->message = $message;
    }

    
    

    

    public function create($connection) {

        $response = new Response(0, "", 0, [], null);


        try {

            $sql = "INSERT INTO contact(name, email, contact_category_id, message) ";
            $sql .= "VALUES(:name, :email, :contact_category_id, :message)";

            $stmt = $connection->prepare($sql);

            if(!$stmt){
                $response->id_message = 4;
                $response->server_message = "Ha ocurrido un error";
                $response->error  =  "Ocurrió un error al preparar la consulta sql: $sql. ";
                return $response;
            }


            $success = $stmt->execute(array(
                ":name" => $this->name,
                ":email" => $this->email,
                ":contact_category_id" => $this->contact_category_id,
                ":message" => $this->message
                ));

            if($success){

                $response->id_message = 1;
                $response->server_message = "Se ha creado correctamente";
                $response->metadata = "".$connection->lastInsertId();


            }else{
                $response->id_message = 4;  // 4 es error de servidor
                $response->server_message  = "No se pudo crear";
                $response->error = "Error al ejecutar el sql: $sql\n ";
            }


        } catch (Exception $e) {
            $response->id_message = 4;  // 4 es error de servidor
            $response->server_message  = "Error del servidor";
            $response->error = $e->getMessage();
        }

        /*$this->conn->beginTransaction();
        if($respuesta['error']  == null){
            $this->conn->commit();
        }else{
            $this->conn->rollBack();
        }*/

        return $response;

    }

    


}
