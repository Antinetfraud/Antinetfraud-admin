import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { active } from '../../../functions/active';
import { api } from '../../../functions/api';
import { checkbox } from '../../../functions/checkbox';
import { destroy } from '../../../functions/destroy';
import { paginator } from '../../../functions/paginator';
import { log } from '../../../functions/log';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-manger',
  templateUrl: './manger.component.html',
  styleUrls: ['./manger.component.css']
})
export class MangerComponent implements OnInit {

  page: number;
  adminsPaginator: paginator;
  code: number = 100;
  admins: object;
  dataUrl: string;
  routerUrl = '/admin/administrator/manger/page/';
  destroyUrl: string = 'admin/';
  destroy: destroy;

  private adminName: string = localStorage.getItem("adminName");

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private routerInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    active("管理员管理");
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
    this.dataUrl = 'admin/all?page=' + this.page;
    this.http.get(api(this.dataUrl)).subscribe(data => {
      if (data['code'] === 200) {
        this.admins = data['admins'];
        this.code = 200;
        let length = this.admins['data'].length;
        this.destroy = new destroy(this.dialog, this.http, this.admins);
        this.adminsPaginator = new paginator(this.admins['last_page'], this.admins['current_page'], this.routerUrl, this.router);
      } else if (data['code'] === 404) {
        this.admins = null;
        this.code = 404;
      }
    });
  }

  destroyAction(id, index) {
    this.destroy.one(id, index, this.destroyUrl);
  }

  watch() {
    if (this.destroy) {
      if (this.destroy.isDelete) {
        log("重新加载")
        this.construct();
        this.destroy.isDelete = false;
      }
    }
  }

}
