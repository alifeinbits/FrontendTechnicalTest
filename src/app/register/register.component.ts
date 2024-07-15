import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from '../services/service.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public registerForm: FormGroup;
    emailPattern: String;
    contactNoPattern: String;
    pinPattern: string;

    constructor(
        private service: ServiceService,
        private toastr: ToastrService,
        private router: Router
    ) {
        this.emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
        this.contactNoPattern = '^[0-9]{8}';
        this.pinPattern = '^[0-9]{4}';
    }

    ngOnInit(): void {
        this.registerForm = new FormGroup(
            {
                name: new FormControl(null, Validators.required),
                email: new FormControl(null, Validators.required),
                customerId: new FormControl(null, Validators.required),
                pin: new FormControl(null, Validators.required),
            }
        )
    }

    submitForm() {
        const userDetails = {
            name: this.registerForm.value.name,
            email: this.registerForm.value.email,
            customerId: this.registerForm.value.customerId,
            pin: this.registerForm.value.pin,
        };
        this.service.onRegister(userDetails).subscribe(
            response => {
                this.router.navigate(['/login']);
                this.toastr.success(response['message']);
            }
        );
    }

    get u() {
        return this.registerForm.controls;
    }
}
