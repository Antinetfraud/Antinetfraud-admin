import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { active } from '../../../functions/active';
import { api } from '../../../functions/api';
import { Parser } from 'ts-hyperdown/parser';

@Component({
  selector: 'app-create',
  templateUrl: '../noticeForm.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  parser = new Parser;
  title: string;
  content: string;
  preview: string;
  active: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    active("撰写公告");
  }

  //create a new notice
  submit() {
    const body = { title: this.title, content: this.content };
    this.http.post(api('notice'), body).subscribe(data => {
      console.log(data);
      if (data['code'] === 200) {
        alert("发布成功");
        this.router.navigate(['/admin/notice/manger/1']);
      }
    });
  }

  contentChange(content: string) {
    this.preview = this.parser.makeHtml(content);
  }

}
