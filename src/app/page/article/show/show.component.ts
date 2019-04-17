import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { api } from '../../../functions/api';
import { img } from '../../../functions/img';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  id: number;
  code: number = 100;
  article: object;

  constructor(
    private http: HttpClient,
    private routerInfo: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.id = this.routerInfo.snapshot.params['id'];
    this.http.get(api('article/show/' + this.id)).subscribe(data => {
      if (data['code'] === 200) {
        this.article = data['article'];
        this.article['image'] = img(this.article['image']);
        this.code = 200;
      } else {
        this.code = 404;
      }
    });
  }

}
