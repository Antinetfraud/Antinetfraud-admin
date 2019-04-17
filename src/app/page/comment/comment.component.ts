import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { api } from '../../functions/api';
import { active } from '../../functions/active';
import { destroy } from '../../functions/destroy';
import { checkbox } from '../../functions/checkbox';
import { paginator } from '../../functions/paginator';
import { ReplyDialog } from '../../module/dialog/reply/reply.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  page: number;
  code: number = 100;
  commentsPaginator: paginator;
  comments: object;
  dataUrl: string;
  routerUrl = '/admin/comment/';
  destroyUrl: string = 'comment/';
  destroyMultipleUrl: string = 'comment/delete/multiple';
  destroy: destroy;
  checkbox: checkbox;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private routerInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    active("评论管理");
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
    this.dataUrl = 'comment/all?page=' + this.page;
    this.http.get(api(this.dataUrl)).subscribe(data => {
      if (data['code'] === 200) {
        this.comments = data['comments'];
        this.code = 200;
        let length = this.comments['data'].length;
        for (let i = 0; i < length; i++) {
          this.comments['data'][i]['index'] = i;
          this.comments['data'][i].checked = false;
        }
        this.destroy = new destroy(this.dialog, this.http, this.comments);
        this.checkbox = new checkbox(this.comments);
        this.commentsPaginator = new paginator(this.comments['last_page'], this.comments['current_page'], this.routerUrl, this.router);
      } else if (data['code'] === 404) {
        this.comments = null;
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

  reply(id: number) {
    let dialogRef = this.dialog.open(ReplyDialog, {
      width: '250px',
      data: {}
    });
    //模态框关闭触发的函数
    dialogRef.afterClosed().subscribe(result => {

      if (result !== "" && result !== undefined) {
        this.http.put(api('comment/reply/' + id), { 'author_reply': result }).subscribe(data => {
          if (data['code'] === 200) {
            alert("回复成功");
            //重新加载数据
            this.construct();
          } else {
            alert(data['message']);
          }
        });
      }

    });
  }

  block(id: number, index: number) {
    this.http.put(api('comment/block/' + id), {}).subscribe(data => {
      if (data['code'] === 200) {
        this.comments['data'][index]['pass'] = false;
      } else {
        alert(data['message']);
      }
    });
  }

  pass(id: number, index: number) {
    this.http.put(api('comment/pass/' + id), {}).subscribe(data => {
      if (data['code'] === 200) {
        this.comments['data'][index]['pass'] = true;
      } else {
        alert(data['message']);
      }
    });
  }

}
