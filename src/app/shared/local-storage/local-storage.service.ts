import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setObject<T>(key: string, obj: T): void {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  getObject<T>(key: string): T | null {
    const data =  localStorage.getItem(key);
    return data ? JSON.parse(data) : null
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
