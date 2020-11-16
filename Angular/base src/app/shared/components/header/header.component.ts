import { LanguajeService } from 'src/app/core/services/languaje.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerResponse } from 'src/app/core/models/server-response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // para transformar
import { BaseString } from 'src/app/core/string/base';


@Component({
  host: {
  '(document:click)': 'onClick($event)',
  },
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   public dictionary$: Observable<BaseString>;
  public my_select_value: number = 0;


  constructor(
    private authService: AuthService,
    private languajeService: LanguajeService,
    private router: Router,
    private _eref: ElementRef,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();

    this.logged_in$ = this.authService.is_logged_in$
      .pipe(
        map(new_state => {
          // console.log("STATE", new_state)
          return new_state
        })
      )
	  
	this.dictionary$ = this.languajeService.dictionary$
      .pipe(
        map(new_dictionary => {
          // console.log("new dictionary", new_dictionary)
          this.my_select_value = new_dictionary.id
          return new_dictionary
        })
      )
  }
  

  ngOnInit(): void {
  }
  
  onOptionsSelected(value){
    
    switch(value){
      case `${LanguajeService.CODE_ES}`:
        this.languajeService.setCookieLanguajePref(LanguajeService.CODE_ES)
        break;
      case `${LanguajeService.CODE_EN}`:
        this.languajeService.setCookieLanguajePref(LanguajeService.CODE_EN)
        break;
    }
    
  }


  private buildForm() {
    this.formGroupSearch = this.formBuilder.group({
      search: ['', [Validators.required]]
    });

    this.formGroupLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  showLoginForm() {
    this.show_login_form = !this.show_login_form;
  }

  

  search(event: Event) {
    event.preventDefault();  // evitar recargar la p+agina

    if(this.formGroupSearch.valid){
      const form = this.formGroupSearch.value;

      console.log(form)
    }
  }

  login(event: Event) {
    event.preventDefault();  // evitar recargar la p+agina

    if(this.formGroupLogin.valid){
      const form = this.formGroupLogin.value;

      console.log(form)

      // se puede enviar solo "changes", con Partial<MyFunction>


      this.authService.authAndRetrieveUser(form.username, form.password)
        .subscribe((response: ServerResponse) => {
          console.log("create", response);

          if(response.id_message == 1){
            this.authService.setCookieLogginUser(form) // TODO: modelo de usuario
            this.show_login_form = false;
          }else{
            alert(response.server_message);
          }
        });
    }



  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['./']);
  }

  @ViewChild('sideBar') sideBar: ElementRef;
  @ViewChild('sideBarMenu') sideBarMenu: ElementRef;

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)){
      this.show_sidebar = false;
      this.sideBarMenu.nativeElement.classList.remove("rotate90")
      this.sideBar.nativeElement.classList.remove("slide")
    }
  }

  showSideBar(sideBar, sideBarMenu) {
    this.show_sidebar = !this.show_sidebar;

    if(this.show_sidebar){
      sideBarMenu.classList.add("rotate90")
      sideBar.classList.add("slide")
    }else{
      sideBarMenu.classList.remove("rotate90")
      sideBar.classList.remove("slide")
    }
  }
}
