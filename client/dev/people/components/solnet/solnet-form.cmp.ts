import {Directive} from "@angular/core";

@Directive({
  selector: '[solnet-input]'
})
export class SolnetInput {}

@Directive({
  selector: '[solnet-textarea]'
})
export class SolnetTextarea {}

export let SOLNET_FORM_DIRECTIVES = [SolnetInput, SolnetTextarea];
