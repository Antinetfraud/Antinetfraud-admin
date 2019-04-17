import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../../functions/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  name: string;
  password: string;
  active: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() { }

  ngDoCheck() {
    if (this.name !== undefined) {
      this.active = true;
    }
  }

  loginAction() {
    const body = { name: this.name, password: this.password, email: this.name };
    this.http.post(api('login'), body, { withCredentials: true }).subscribe(data => {
      console.log(data);
      if (data['code'] === 200) {
        alert("登录成功");
        localStorage.setItem("level", data['user']['level']);
        localStorage.setItem("adminName", data['user']['name']);
        this.router.navigate(['/admin/home']);
      } else {
        alert(data['message']);
      }
    });
  }

}
