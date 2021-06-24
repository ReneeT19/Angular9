import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { promise } from "selenium-webdriver";

export class CustomValidators {
    //static is important as it can be accessed 
    static invalidProjectName(control: FormControl): {[s: string]: boolean} {
        if (control.value === 'Test') {
            return {'invalidProjectName': true};
        }
        return null;
    }

    static asyncInvalidProjectName(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'Testproject') {
                    resolve({'invalidProjectName': true});
                } else {
                    resolve(null);
                }
            }, 2000);
        })
        return promise;
    }
}