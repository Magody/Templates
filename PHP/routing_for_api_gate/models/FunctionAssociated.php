<?php

require_once 'Response.php';

class FunctionAssociated {



    private $id;
    private $name;
    private $description;


    public function __construct($id, $name, $description) {

       $this->id = $id;
       $this->name = $name;
       $this->description = $description;

    }

	public static function getAllFunctions($connection, $option) {

        $response = new Response(0, "iniciando get de functions", 0, [], null);


        try {

			$sql = "SELECT * FROM function ";
			
			if($option == 1){
				$sql .= "WHERE function_type_id > 0 ";
			}
			else if($option == 2){
				$sql .= "WHERE function_type_id > 1 ";
			}
			else if($option == 3){
				$sql .= "WHERE function_type_id=3 ";
			}
			$sql .= "ORDER BY id ASC";

            $stmt = $connection->prepare($sql);

            if(!$stmt){
                $response->id_message = 4;
                $response->server_message = "Ha ocurrido un error";
                $response->error  =  "Ocurrió un error al preparar la consulta sql: $sql. ";
                return $response;
            }


            $success = $stmt->execute();

            if($success){

                $response->id_message = 1;
                $response->server_message = "Se ha consultado correctamente";
				
				$data = [];
				
				$quantity = $stmt->rowCount();
				
				while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					array_push($data, $row);
                }
				
				
				$response->data = $data;
				$response->metadata = "".$quantity;
				


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

    public static function getAllFunctionsBySkipStep($connection, $skip, $step) {

        $response = new Response(0, "iniciando get de functions skip-step", 0, [], null);


        try {

			$sql = "SELECT * FROM function limit $skip, $step";
			

            $stmt = $connection->prepare($sql);

            if(!$stmt){
                $response->id_message = 4;
                $response->server_message = "Ha ocurrido un error";
                $response->error  =  "Ocurrió un error al preparar la consulta sql: $sql. ";
                return $response;
            }


            $success = $stmt->execute();

            if($success){

                $response->id_message = 1;
                $response->server_message = "Se ha consultado correctamente";
				
				$data = [];
				
				$quantity = $stmt->rowCount();
				
				while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
					array_push($data, $row);
                }
				
				
				$response->data = $data;
				$response->metadata = "".$quantity;
				


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

        return $response;

    }


}
