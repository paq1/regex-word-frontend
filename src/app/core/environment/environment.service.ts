import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  private env = (window as any).__env;

  get executionEnvironment(): string {
    console.log(this.env);
    return this.env.ENV || '';
  }

  get rgwApiUrl(): string {
    return this.env.RGW_API_URL || '';
  }
}
