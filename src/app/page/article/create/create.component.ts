import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Parser } from 'ts-hyperdown/parser';
import { active } from '../../../functions/active';
import { api } from '../../../functions/api';
import { img } from '../../../functions/img';

@Component({
  selector: 'app-create',
  templateUrl: '../articleForm.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  parser = new Parser;
  title: string;
  source: string;
  content: string;
  preview: string;
  tag_id: number;
  image: string = null;
  imgURL: string;
  imageFile;
  active: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    active("添加案例");
  }

  getFile(e) {
    this.imageFile = (e.target.files[0]);
  }

  //upload a image,create a new article
  submit() {
    if (this.imageFile !== undefined) {
      //创建form对象
      let param = new FormData();
      //通过append向form对象添加数据
      param.append('image', this.imageFile);

      this.http.post(api('article/image/upload/'), param).subscribe(data => {
        console.log(data);
        if (data['code'] === 200) {
          this.image = data['image'];
          this.imgURL = img(data['image']);
          this.createArticle();
        } else {
          console.log(data);
        }
      });
    } else {
      alert("请选择封面图片");
    }

  }

  createArticle() {
    const body = { title: this.title, content: this.content, source: this.source, tag_id: this.tag_id, image: this.image };
    this.http.post(api('article/create'), body).subscribe(data => {
      if (data['code'] === 200) {
        alert("发布成功");
        this.router.navigate(['/admin/article/manger/tag/0/page/1']);
      }
    });
  }

  contentChange(content: string) {
    // console.log(content);
    this.preview = this.parser.makeHtml(content);
  }

  img(url: String) {
    return "http://127.0.0.1:8000" + url;
  }

}
