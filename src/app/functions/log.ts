import { environment } from './../../environments/environment';

export function log(obj: any): void {
	if (!environment.production) {
		console.log(obj);
	}
}