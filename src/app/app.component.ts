import {Component} from '@angular/core';
import {SocialLoginService} from './ngx-social-login';
import {Provider} from './ngx-social-login/models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {


    constructor(private service: SocialLoginService) {
    }

    loginWithGoogle(): void {
        this.service.login(Provider.GOOGLE).subscribe(s => console.log(s));
    }

    loginWithFacebook(): void {
        this.service.login(Provider.FACEBOOK).subscribe(s => console.log(s));
    }

    logout(): void {
        this.service.logout().subscribe({
            complete: () => console.log('Logout success'),
            error: err => console.log(err)
        });
    }

}
