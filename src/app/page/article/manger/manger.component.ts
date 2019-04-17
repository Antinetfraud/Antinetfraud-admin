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
  selector: 'app-manger',
  templateUrl: './manger.component.html',
  styleUrls: ['./manger.component.css']
})

export class MangerComponent implements OnInit {

  tag: number;
  page: number;
  code: number = 100;
  articles: object;
  dataUrl: string;
  routerUrl: string;
  articlePaginator: paginator;
  tagPaginator: TagPaginator;
  destroyUrl: string = 'article/';
  destroyMultipleUrl: string = 'article/delete/multiple';
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
    this.construct();
    this.router.events
      .subscribe((event) => {
        // example: NavigationStart, RoutesRecognized, NavigationEnd
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          //console.log('NavigationEnd:', event);
          this.construct();
        }
      });
  }

  //初始化函数，获取数据，数据初始化。
  construct(): void {
    this.tag = parseInt(this.routerInfo.snapshot.params["tag"]);
    this.page = parseInt(this.routerInfo.snapshot.params["page"]);

    this.tagPaginator = new TagPaginator(this.tag, this.router);

    if (this.page === undefined || isNaN(this.page)) {
      this.page = 1;
    }
    //tag为0表示所有文章
    if (this.tag === 0) {
      this.dataUrl = 'article/all?page=' + this.page;
      this.routerUrl = '/admin/article/manger/tag/0/page/';
    } else {
      this.dataUrl = 'article/tag/' + this.tag + '?page=' + this.page;
      this.routerUrl = '/admin/article/manger/tag/' + this.tag + '/page/';
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
        this.articlePaginator = new paginator(this.articles['last_page'], this.articles['current_page'], this.routerUrl, this.router);
      } else if (data['code'] === 404) {
        this.articles = null;
        this.code = 404
      }
    });
  }

  destroyAction(id, index): void {
    this.destroy.one(id, index, this.destroyUrl);
  }

  destroyMultiple() {
    this.destroy.multiple(this.destroyMultipleUrl);
    //this.construct();
  }

  watch() {
    if (this.destroy) {
      if (this.destroy.isDelete) {
        console.log("重新加载")
        this.construct();
        this.destroy.isDelete = false;
      }
      this.checkbox.watchChecked();
    }
  }

}

//分类select
class TagPaginator {

  public current: number;
  public selected: number;
  public list: Array<tag>;

  constructor(current: number, private router: Router) {

    this.current = current;
    this.selected = current;

    this.list = [];
    //写死tag的option内容，因为这个部分基本上不可能做拓展了。
    this.list.push(new tag(0, '所有文章', '/admin/article/manger/tag/0/page/1'));
    this.list.push(new tag(1, '网络诈骗', '/admin/article/manger/tag/1/page/1'));
    this.list.push(new tag(2, '电信诈骗', '/admin/article/manger/tag/2/page/1'));
    this.list.push(new tag(3, '小小贴士', '/admin/article/manger/tag/3/page/1'));

  }

  change() {
    if (this.selected !== this.current) {
      this.router.navigate([this.list[this.selected].url]);
    }
  }
}

//一个分类option
class tag {
  public id: number;
  public name: string;
  public url: string;

  constructor(id: number, name: string, url: string) {
    this.id = id;
    this.name = name;
    this.url = url;
  }
}

