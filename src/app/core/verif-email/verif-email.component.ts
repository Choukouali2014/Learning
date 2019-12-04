import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.scss']
})
export class VerifEmailComponent implements OnInit {
  email;
  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.auth.user.subscribe(userData => {this.email = userData['email'];});
  }

}
