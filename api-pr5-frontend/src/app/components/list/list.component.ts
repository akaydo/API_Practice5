import { Component, OnInit } from '@angular/core';
import { Phone } from 'src/app/models/phone.model';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  phones?: Phone[];
  currentPhone: Phone = {};
  currentIndex = -1;
  username = '';

  constructor(private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.retrievePhones();
  }

  retrievePhones(): void {
    this.phoneService.getAll()
      .subscribe({
        next: (data) => {
          this.phones = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrievePhones();
    this.currentPhone = {};
    this.currentIndex = -1;
  }

  setActivePhone(phone: Phone, index: number): void {
    this.currentPhone = phone;
    this.currentIndex = index;
  }

  removeAllPhones(): void {
    this.phoneService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchUsername(): void {
    this.currentPhone = {};
    this.currentIndex = -1;

    this.phoneService.findByUsername(this.username)
      .subscribe({
        next: (data) => {
          this.phones = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}