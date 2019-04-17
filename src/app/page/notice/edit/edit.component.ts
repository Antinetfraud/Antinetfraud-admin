import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { api } from '../../../functions/api';
import { active } from '../../../functions/active';
import { Parser } from 'ts-hyperdown/parser';

@Component({
  selector: 'app-edit',
  templateUrl: '../noticeForm.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  parser = new Parser;
  title: string;
  content: string;
  preview: string;
  id: number;
  active: boolean = true;

  constructor(
    private http: HttpClient,
    private routerInfo: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
    active("撰写公告");
  }

  getData() {
    this.id = this.routerInfo.snapshot.params["id"];
    this.http.get(api('notice/show/' + this.id)).subscribe(data => {
      if (data['code'] === 200) {
        this.title = data['notice'].title;
        this.content = data['notice'].content;
        this.preview = this.parser.makeHtml(this.content);
      }
    });
  }

  //update a notice
  submit() {
    console.log("hello");
    const body = { title: this.title, content: this.content };
    this.http.put(api('notice/update/' + this.id), body).subscribe(data => {
      if (data['code'] === 200) {
        alert("修改成功");
        this.router.navigate(['/admin/notice/manger/1']);
      }
    });
  }

  contentChange(content: string) {
    this.preview = this.parser.makeHtml(content);
  }

}
