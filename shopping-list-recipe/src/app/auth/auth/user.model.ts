
export class User {
    //for private fields use getters to get it
    constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) {}

    get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null; //to handle expired token
        }
        return this._token;
    }
}