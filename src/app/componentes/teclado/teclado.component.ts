import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.css']
})


export class TecladoComponent implements OnInit {

  value = "";
  keyboard: any;
  @Output() letra = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
  }

  ngAfterViewInit(letra = '') {
    this.keyboard = new Keyboard(".simple-keyboard",{
      // onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      theme: "hg-theme-default hg-layout-default myTheme",
      layout: {
        default: [
          "q w e r t y u i o p",
          "a s d f g h j k l ñ",
          "z x c v b n m",
        ]},
      excludeFromLayout: {
          default: [letra],
        }
    });
  }

  // onChange = (input: string) => {
  //   this.value = input;
  //   console.log("Input changed", input);
  // };

  ocultarLetra = (letra: string) => {
    this.keyboard.excludeFromLayout()
  }
  onKeyPress = (button: string) => {
    console.log("Button pressed", button);
    this.letra.emit(button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    // if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

}
