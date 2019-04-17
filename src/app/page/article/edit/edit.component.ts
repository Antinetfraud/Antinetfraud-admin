import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Parser } from 'ts-hyperdown/parser';
import { api } from '../../../functions/api';
import { img } from '../../../functions/img';
import { active } from '../../../functions/active';

@Component({
  selector: 'app-edit',
  templateUrl: '../articleForm.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  parser = new Parser;
  title: string;
  source: string;
  content: string;
  preview: string;
  tag_id: number;
  image: string = null;
  imgURL: string;
  imageFile;
  id: number;
  active: boolean = true;

  constructor(
    private http: HttpClient,
    private routerInfo: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.id = this.routerInfo.snapshot.params["id"];
    this.http.get(api('article/edit/' + this.id)).subscribe(data => {
      if (data['code'] === 200) {
        this.title = data['article'].title;
        this.content = data['article'].content;
        this.source = data['article'].source;
        this.tag_id = data['article'].tag_id;
        this.image = data['article'].image;
        this.imgURL = img(data['article'].image)

        this.preview = this.parser.makeHtml(this.content);
      }
    });
  }

  getFile(e) {
    this.imageFile = (e.target.files[0]);
  }

  //update a articles
  submit() {
    if (this.imageFile === undefined) {
      this.updateArticle();
    } else {
      //创建form对象
      let param = new FormData();
      //通过append向form对象添加数据
      param.append('image', this.imageFile);

      this.http.post(api('article/image/upload/'), param).subscribe(data => {
        console.log(data);
        if (data['code'] === 200) {
          this.image = data['image'];
          this.updateArticle();
        } else {
          console.log(data);
        }
      });
    }
  }

  updateArticle() {
    const body = { title: this.title, content: this.content, source: this.source, tag_id: this.tag_id, image: this.image };
    this.http.put(api('article/update/' + this.id), body).subscribe(data => {
      if (data['code'] === 200) {
        alert("修改成功");
        this.router.navigate(['/admin/article/manger/tag/0/page/1']);
      }
    });
  }

  contentChange(content: string) {
    this.preview = this.parser.makeHtml(content);
  }

}
