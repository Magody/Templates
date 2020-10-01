import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Deliver } from 'src/app/core/models/deliver.model';
import { DeliversService } from 'src/app/core/services/delivers/delivers.service';
import { environment } from 'src/environments/environment';
import { RespuestaDelivers } from 'src/app/core/models/respuestas/respuesta-delivers.model';
import { Router } from '@angular/router';
import { Respuesta } from 'src/app/core/models/respuesta.model';

@Component({
  selector: 'app-delivers-list',
  templateUrl: './delivers-list.component.html',
  styleUrls: ['./delivers-list.component.scss']
})

export class DeliversListComponent implements OnInit {

  skip: number;
  step: number;
  es_busqueda:boolean;

  delivers : Deliver[] = [];
  formGroup: FormGroup;

  metodos_busqueda = [
    {
      codigo: 0,
      descripcion: "Buscar por correo",
    },
    {
      codigo: 1,
      descripcion: "Buscar por usuario",
    },
  ]


  hay_datos: boolean;

  displayedColumns: string[] = [
    "actions", "correo", "user", "nombre", "telefono", "ultima_fecha_logeo", "habilitado",
    "calificacion_promedio", "ganancia_total", "ganancia_mes",
    "fecha_inicio_referencia", "fecha_fin_referencia"
  ];

  constructor(
    private formBuilder: FormBuilder,
    private deliversService: DeliversService,
    private router: Router
  ) {
    this.es_busqueda = false;
    this.hay_datos = true;
    this.buildForm();
  }


  ngOnInit(): void {
    this.skip = 0;
    this.step = environment.minimum_step_read_table;
    this.fetchDelivers(this.skip, this.step);
  }

  consultarTodo() {
    this.skip = 0;
    this.step = environment.minimum_step_read_table;
    this.es_busqueda =false;
    this.delivers = [];
    this.fetchDelivers(this.skip, this.step);
  }

  fetchDelivers(skip: number, step: number) {

    this.deliversService.getDelivers(skip, step)

      .subscribe((respuesta:RespuestaDelivers) => {

        console.log("Se recibió", respuesta);

        if(respuesta.data.length == 0){
          this.hay_datos = false;
          this.skip -= this.step;
        }else{
          this.hay_datos = true;
        }

        this.delivers = this.delivers.concat(respuesta.data);

        console.log("Delivers actualizado", this.delivers);
      });
   }

   getMore(){
     this.skip += this.step;
     this.fetchDelivers(this.skip, this.step);
   }

   navegarEditarDeliver(deliver: Deliver) {
     this.deliversService.deliverEdicion = deliver;
     this.router.navigate(['/panel/delivers/edit'])

   }

   consultarEspecifico(event: Event){
     event.preventDefault();  // evitar recargar la p+agina

     if(this.formGroup.valid){
       const form = this.formGroup.value;

       console.log("Se va a enviar ", form);

       this.deliversService.buscarDeliver(form.metodo_busqueda, form.valor)
         .subscribe((respuesta: RespuestaDelivers) => {

           console.log("respuesta de delivers", respuesta);

           this.delivers = respuesta.data;
           this.es_busqueda = true;
         });


     }

   }
   toggleDeliverHabilitado(deliver: Deliver){

     deliver.habilitado = !deliver.habilitado;

     this.deliversService.toggleHabilitado(deliver.user, deliver.habilitado)
       .subscribe((respuesta: Respuesta) => {

         console.log("respuesta de delivers", respuesta);
         if(respuesta.id_message != 1){
           alert(respuesta.server_message);
         }

       });
   }

   private buildForm() {
     this.formGroup = this.formBuilder.group({
       metodo_busqueda: ['', Validators.required],
       valor: ['', Validators.required],
     });
   }

}
