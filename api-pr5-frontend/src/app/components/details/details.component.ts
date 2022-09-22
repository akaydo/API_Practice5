import { Component, Input, OnInit } from '@angular/core';
import { PhoneService } from 'src/app/services/phone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Phone } from 'src/app/models/phone.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentPhone: Phone = {
    username: '',
    email: '',
    mobile: '',
    published: false
  };

  message = '';

  constructor(
    private phoneService: PhoneService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getPhone(this.route.snapshot.params["id"]);
    }
  }

  getPhone(id: string): void {
    this.phoneService.get(id)
      .subscribe({
        next: (data) => {
          this.currentPhone = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      username: this.currentPhone.username,
      email: this.currentPhone.email,
      mobile: this.currentPhone.mobile,
      published: status
    };

    this.message = '';

    this.phoneService.update(this.currentPhone.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentPhone.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updatePhone(): void {
    this.message = '';

    this.phoneService.update(this.currentPhone.id, this.currentPhone)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This phone was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deletePhone(): void {
    this.phoneService.delete(this.currentPhone.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/phones']);
        },
        error: (e) => console.error(e)
      });
  }

}
