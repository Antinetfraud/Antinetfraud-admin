import { environment } from './../../environments/environment';

export function img(url: String) {
  return environment.img + url;
}