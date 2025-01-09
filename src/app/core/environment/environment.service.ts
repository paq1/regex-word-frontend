import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  private env = (window as any).__env;

  get testVar(): string {
    return this.env.VAR_TEST || '';
  }
}
