import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { api } from '../../../functions/api';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  adminLevel: Array<number> = [0];
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  level: number;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    let level = parseInt(localStorage.getItem("level"));
    console.log(level);
    for (let i = 1; i <= level; i++) {
      this.adminLevel.push(i);
    }
  }

  createAdmin() {
    if (this.password === this.confirmPassword && this.password !== null) {
      const body = {
        'name': this.name,
        'email': this.email,
        'password': this.password,
        'level': this.level
      }

      this.http.post(api('admin/create'), body).subscribe(data => {
        if (data['code'] === 200) {
          alert("创建成功");
          this.router.navigate(['/admin/administrator/manger/1']);
        } else {
          alert(data['message']);
        }
      });

    } else {
      alert("两次密码不匹配");
    }

  }

}
