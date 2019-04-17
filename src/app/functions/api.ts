import { environment } from './../../environments/environment';

export function api(url: String) {
  return environment.api + url;
}
