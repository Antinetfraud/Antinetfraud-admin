import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { active } from '../../functions/active';
import { api } from '../../functions/api';
import { checkbox } from '../../functions/checkbox';
import { destroy } from '../../functions/destroy';
import { paginator } from '../../functions/paginator';
import { log } from '../../functions/log';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  page: number;
  code: number = 100;
  usersPaginator: paginator;
  users: object;
  dataUrl: string;
  routerUrl = '/admin/user/manger/';
  destroyUrl: string = 'user/';
  destroyMultipleUrl: string = 'user/delete/multiple';
  destroy: destroy;
  checkbox: checkbox;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private routerInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    active("用户管理");
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
    this.dataUrl = 'user/all?page=' + this.page;
    this.http.get(api(this.dataUrl)).subscribe(data => {
      if (data['code'] === 200) {
        this.users = data['users'];
        this.code = 200;
        let length = this.users['data'].length;
        for (let i = 0; i < length; i++) {
          this.users['data'][i]['index'] = i;
          this.users['data'][i].checked = false;
        }
        this.destroy = new destroy(this.dialog, this.http, this.users);
        this.checkbox = new checkbox(this.users);
        this.usersPaginator = new paginator(this.users['last_page'], this.users['current_page'], this.routerUrl, this.router);
      } else if (data['code'] === 404) {
        this.users = null;
        this.code = 404;
      }
    });
  }

  destroyAction(id: number, index: number) {
    this.destroy.one(id, index, this.destroyUrl);
  }

  destroyMultiple() {
    this.destroy.multiple(this.destroyMultipleUrl);
  }

  watch() {
    if (this.destroy) {
      if (this.destroy.isDelete) {
        log("重新加载")
        this.construct();
        this.destroy.isDelete = false;
      }
      this.checkbox.watchChecked();
    }
  }

  block(id: number, index: number) {
    this.http.put(api('user/block/' + id), {}).subscribe(data => {
      if (data['code'] === 200) {
        this.users['data'][index]['state'] = 2;
        this.users['data'][index]['state_name'] = '被封禁';
      } else {
        alert(data['message']);
      }
    });
  }

  unblock(id: number, index: number) {
    this.http.put(api('user/unblock/' + id), {}).subscribe(data => {
      if (data['code'] === 200) {
        this.users['data'][index]['state'] = 1;
        this.users['data'][index]['state_name'] = '正常用户';
      } else {
        alert(data['message']);
      }
    });
  }

}
