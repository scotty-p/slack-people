import {Directive} from "@angular/core";

@Directive({
  selector: '[solnet-input]',
  styles: [`
    input {
      border: solid 1px #ccc;
    }  
  `]
})
export class SolnetInput {
  constructor()
}
