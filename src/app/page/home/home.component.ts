import { Component, OnInit } from '@angular/core';
import { active } from '../../functions/active';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    active("管理首页");
  }

}
