import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
    transform(value: any) {
        if (value.length > 10) { //only return this when the length is >10
            return value.substr(0, 10) + ' ...'; //only gies the first 10 characters
        }
        return value; //otherwise just return what it is
    }
}