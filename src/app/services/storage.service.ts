import { Injectable } from '@angular/core';
import { isDate, isRegex } from '../commons/utils';


function encode (value: unknown): string {
  if (isDate(value)) {
    return '__st_date|' + (value as Date).toUTCString();
  }
  if (isRegex(value)) {
    return '__st_expr|' + (value as RegExp).source;
  }
  if (typeof value === 'number') {
    return '__st_numb|' + value;
  }
  if (typeof value === 'boolean') {
    return '__st_bool|' + (value ? '1' : '0');
  }
  if (typeof value === 'string') {
    return '__st_strn|' + value;
  }
  if (typeof value === 'function') {
    return '__st_strn|' + value.toString();
  }
  if (value === Object(value)) {
    return '__st_objt|' + JSON.stringify(value);
  }

  return value + '';
}

function decode (value: string): unknown {
  const length = value.length;
  if (length < 10) {
    return value;
  }

  const type = value.substr(0, 9);
  const source = value.substring(10);

  switch (type) {
    case '__st_date':
      return new Date(source);

    case '__st_expr':
      return new RegExp(source);

    case '__st_numb':
      return Number(source);

    case '__st_bool':
      return Boolean(source === '1');

    case '__st_strn':
      return '' + source;

    case '__st_objt':
      return JSON.parse(source);

    default:
      // hmm, we reached here, we don't know the type,
      // then it means it wasn't encoded by us, so just
      // return whatever value it is
      return value
  }
}


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage;

  constructor() { 
    this._storage = localStorage;
  }

  public get<T>(key: string): T | null {
    let result = null;
    const item = this._storage.getItem(key);
    if (item) {
      result = decode(item) as T;
    }
    return result;
  }

  public set<T>(key: string, data: T): void {
    const item = encode(data);
    this._storage.setItem(key, item);
  }

  public remove(key: string): void {
    this._storage.removeItem(key);
  }
}
