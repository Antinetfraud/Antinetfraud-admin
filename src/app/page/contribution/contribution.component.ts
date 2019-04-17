import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { api } from '../../functions/api';
import { active } from '../../functions/active';
import { destroy } from '../../functions/destroy';
import { checkbox } from '../../functions/checkbox';
import { paginator } from '../../functions/paginator';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.css']
})
export class ContributionComponent implements OnInit {

  page: number;
  code: number = 100;
  contributionsPaginator: paginator;
  contributions: object;
  dataUrl: string;
  routerUrl = '/admin/contribution/manger/';
  destroyUrl: string = 'contribution/';
  destroyMultipleUrl: string = 'contribution/delete/multiple';
  destroy: destroy;
  checkbox: checkbox;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private routerInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    active("投稿管理");
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

  //自定义的构造函数，主要用于获取多个API数据，可重复调用。
  construct() {
    this.page = parseInt(this.routerInfo.snapshot.params["page"]);
    if (this.page === undefined || isNaN(this.page)) {
      this.page = 1;
    }
    this.dataUrl = 'contribution/all?page=' + this.page;
    this.http.get(api(this.dataUrl)).subscribe(data => {
      if (data['code'] === 200) {
        this.contributions = data['contributions'];
        this.code = 200;
        let length = this.contributions['data'].length;
        for (let i = 0; i < length; i++) {
          this.contributions['data'][i]['index'] = i;
          this.contributions['data'][i].checked = false;
        }
        this.destroy = new destroy(this.dialog, this.http, this.contributions);
        this.checkbox = new checkbox(this.contributions);
        this.contributionsPaginator = new paginator(this.contributions['last_page'], this.contributions['current_page'], this.routerUrl, this.router);
      } else if (data['code'] === 404) {
        this.contributions = null;
        this.code = 404;
      }
    });
  }

  destroyAction(id, index) {
    this.destroy.one(id, index, this.destroyUrl);
  }

  destroyMultiple() {
    this.destroy.multiple(this.destroyMultipleUrl);
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
