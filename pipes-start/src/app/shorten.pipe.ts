import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
    transform(value: any, limit: number) {
        if (value.length > limit) { //only return this when the length is >10 or limit
            return value.substr(0, limit) + ' ...'; //only gies the first 10/limit characters
        }
        return value; //otherwise just return what it is
    }
}