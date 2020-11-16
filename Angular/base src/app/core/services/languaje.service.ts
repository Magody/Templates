import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseString } from '../string/base';
import { dictionary_es } from './../string/es';
import { dictionary_en } from './../string/en';


@Injectable({
  providedIn: 'root'
})
export class LanguajeService {

  static CODE_ES = 0;
  static CODE_EN = 1;

  private dictionary = new BehaviorSubject<BaseString>(null);
  dictionary$ = this.dictionary.asObservable(); // tipo observable sdfs$


  
  constructor() {
    this.loadLanguajePref()
  }

  loadLanguajePref(){
    let CODE = JSON.parse(localStorage.getItem("code"));
    console.log("LANGUAJE PREF", CODE)
    if(CODE != null && CODE != undefined){
      this.loadDictionary(CODE)
    }
    else{
      this.loadDictionary(LanguajeService.CODE_ES)
    }
  }

  setCookieLanguajePref(CODE: number) {
    console.log("PREF ", CODE)
    localStorage.setItem("code", JSON.stringify(CODE))
    this.loadDictionary(CODE)
  }

  loadDictionary(CODE: number) {
    
    switch(CODE){
      case LanguajeService.CODE_ES:
        this.dictionary.next(dictionary_es)
        
        break;

      case LanguajeService.CODE_EN:
        this.dictionary.next(dictionary_en)
        
        break;

      default:
        this.dictionary.next(dictionary_es)
    }

  }


}
