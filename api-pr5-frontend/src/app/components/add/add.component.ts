import { Component } from '@angular/core';
import { Phone } from 'src/app/models/phone.model';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  phone: Phone = {
    username: '',
    email: '',
    mobile: '',
    published: false,
  };
  submitted = false;

  constructor(private phoneService: PhoneService) { }

  savePhone(): void {
    const data = {
      username: this.phone.username,
      email: this.phone.email,
      mobile: this.phone.mobile
    };

    this.phoneService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newPhone(): void {
    this.submitted = false;
    this.phone = {
      username: '',
      email: '',
      mobile: '',
      published: false
    };
  }

}