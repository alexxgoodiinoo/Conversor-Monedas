import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversor } from '../interfaces/conversor.interface';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {
  constructor(private http:HttpClient) { 
    const params = new HttpParams()
    .set ('access_key', this.apiKey);

    this.http.get<Conversor>(`${ this.serviceURL }/latest`, { params })
    .subscribe ( resp => {
      this.nombreMonedas = Object.keys(resp.rates);
      this.listaMonedas = Object(resp.rates);
    }) 
  }

  private apiKey: string = 'f2986c9bc6755929aaae05536ebff189';
  private serviceURL: string = 'https://api.exchangeratesapi.io/v1';
  public conversorList: Conversor[] = [];
  public listaMonedas: { [key:string]: number } = {};
  public nombreMonedas: string[] = [];
  
  public obtenerMonedas(): string[] {
    return this.nombreMonedas;
  }
  public calcularEquivalencia(cantidad: number,monedaPrincipal: string,monedaCambio: string) {
    if (monedaPrincipal === 'EUR') {
      return this.euroAMoneda(cantidad, monedaCambio);
    } else if (monedaCambio === 'EUR') {
      return this.monedaAEuro(cantidad, monedaPrincipal);
    } else {
      return this.cambioGeneral(cantidad, monedaCambio, monedaPrincipal);
    }
  }
  
  public euroAMoneda(cantidad: number, monedaCambio: string) {
    let valorMoneda: number = this.listaMonedas[monedaCambio];
    return cantidad * valorMoneda;
  }
  public monedaAEuro(cantidad: number, monedaPrincipal: string) {
    let valorMoneda: number = this.listaMonedas[monedaPrincipal];
    return cantidad / valorMoneda;
  }
  public cambioGeneral(cantidad: number, monedaCambio: string, monedaPrincipal: string) {
    let valorMonedaCambio: number = this.listaMonedas[monedaCambio];
    let valorEnEuro = this.monedaAEuro(cantidad, monedaPrincipal);
    return valorEnEuro * valorMonedaCambio;
  }
}