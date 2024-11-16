import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {CurrentRegexes} from '../store/states/RegexWord';
import {TableSdd} from '../models/word.model';

@Injectable({
  providedIn: 'root'
})
export class RegexStorageService {

  constructor(private readonly localStorageService: LocalStorageService) { }

  clear(): void {
    this.localStorageService.clear();
  }

  getCurrentRegex(): CurrentRegexes | null {
    return this.localStorageService.getObject('currentRegexes');
  }

  getTable(): TableSdd | null {
    return this.localStorageService.getObject('tableSdd');
  }

  saveCurrentRegex(currentRegexes: CurrentRegexes): void {
    this.localStorageService.setObject('currentRegexes', currentRegexes);
  }

  saveTable(table: TableSdd): void {
    this.localStorageService.setObject('tableSdd', table);
  }
}
