import { Component } from '@angular/core';
import { ConversorService } from '../../services/conversor.service';

@Component({
  selector: 'app-convertir',
  templateUrl: './convertir.component.html',
  styleUrl: './convertir.component.css'
})
export class ConvertirComponent {
  
  public monedas: string[] = [];
  public valor?: number;
  public cantidad!:number;
  public monedaPrincipal!:string;
  public monedaCambio!:string;


  constructor(private conversorServicio:ConversorService){}

  obtenerMonedas(): void{
    this.monedas = this.conversorServicio.obtenerMonedas();
  }
  calcularEquivalencia(cantidad:number,monedaPrincipal:string,monedaCambio:string):void{
    this.valor=this.conversorServicio.calcularEquivalencia(cantidad,monedaPrincipal,monedaCambio)
  }
}
