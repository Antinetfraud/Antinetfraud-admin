import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { api } from '../../../functions/api';
import { active } from '../../../functions/active';
import { destroy } from '../../../functions/destroy';
import { checkbox } from '../../../functions/checkbox';
import { paginator } from '../../../functions/paginator';

@Component({
  selector: 'app-recyclebin',
  templateUrl: './recyclebin.component.html',
  styleUrls: ['./recyclebin.component.css']
})
export class RecyclebinComponent implements OnInit {

  page: number;
  code: number = 100;
  dataUrl: string = 'article/trashed';
  articles: object;
  routerUrl: string;
  destroyUrl: string = 'article/force/delete/';
  destroyMultipleUrl: string = 'article/force/delete/multiple';
  destroy: destroy;
  checkbox: checkbox;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private routerInfo: ActivatedRoute
  ) { }

  ngOnInit(): void {
    active("案例管理");

    this.router.events
      .subscribe((event) => {
        // example: NavigationStart, RoutesRecognized, NavigationEnd
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          //console.log('NavigationEnd:', event);
          this.construct();
        }
      });

    this.construct();
  }

  //初始化函数，获取数据，数据初始化。
  construct(): void {

    if (this.page === undefined || isNaN(this.page)) {
      this.page = 1;
    }

    this.http.get(api(this.dataUrl)).subscribe(data => {
      if (data['code'] === 200) {
        this.articles = data['articles'];
        this.code = 200;
        let length = this.articles['data'].length;
        for (let i = 0; i < length; i++) {
          this.articles['data'][i]['index'] = i;
          this.articles['data'][i].checked = false;
        }
        this.destroy = new destroy(this.dialog, this.http, this.articles);
        this.checkbox = new checkbox(this.articles);
      } else if (data['code'] === 404) {
        this.articles = null;
        this.code = 404;
      }
    });
  }

  restoreAction(id, index): void {
    this.http.put(api('article/restore/' + id), {}).subscribe(data => {
      if (data['code'] === 200) {
        this.articles['data'].splice(index, 1);
        this.destroy.isDelete = true;
      } else {
        alert(data['message']);
      }
    });
  }

  destroyAction(id, index): void {
    // this.destroy.one(id, index, this.destroyUrl);
    this.http.post(api(this.destroyUrl + id), {}).subscribe(data => {
      if (data['code'] === 200) {
        this.articles['data'].splice(index, 1);
        this.destroy.isDelete = true;
      } else {
        alert(data['message']);
      }
    });
  }

  destroyMultiple() {
    // this.destroy.multiple(this.destroyMultipleUrl);
  }

  watch() {
    if (this.destroy) {
      if (this.destroy.isDelete) {
        console.log("重新加载")
        this.construct();
        this.destroy.isDelete = false;
      }
    }
  }

}
