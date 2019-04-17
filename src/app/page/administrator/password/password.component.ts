import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { active } from '../../../functions/active';
import { api } from '../../../functions/api';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    active("修改密码");
  }

  changePassword() {
    if (this.confirmPassword === this.newPassword) {
      const body = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
      this.http.put(api('password/reset'), body).subscribe(data => {
        if (data['code'] === 200) {
          alert("修改成功,请重新登录");
          this.router.navigate(['/login']);
        } else {
          alert(data['message']);
        }
      });
    } else {
      alert("新密码两次输入不一致");
    }

  }

}
