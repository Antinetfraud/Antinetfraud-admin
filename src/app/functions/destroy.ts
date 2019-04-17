import { api } from './api';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteDialog } from '../module/dialog/delete/delete.component';

//管理系统有很多删除操作，需要提供id，数组下标，删除api，数组本身
//于是，抽象出来做一个删除类。
export class destroy {
  public isDelete: boolean = false;
  private checkedNum: number = 0;
  private isSelectAll: boolean = false;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private items: object,
  ) { }

  test() {
    console.log("test")
    for (let i in this.items['data']) {
      this.items['data'][i].fuck = false;
    }
  }

  one(id: number, index: number, url: string): void {
    let dialogRef = this.dialog.open(DeleteDialog, {
      width: '250px',
      data: { id: id }
    });

    //模态框关闭触发的函数
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.http.delete(api(url + id)).subscribe(data => {
          if (data['code'] === 200) {
            this.items['data'].splice(index, 1);
            this.isDelete = true;
          } else if (data['code'] === 401) {
            alert(data['message']);
          } else {
            alert(data['message']);
          }
        });
      }

    });
  }

  multiple(url): void {
    let dialogRef = this.dialog.open(DeleteDialog, {
      width: '250px',
      //data: { id: id }
    });
    let indexArray = [];
    let idArray = [];

    let length = this.items['data'].length;

    //因为js的数组会自动整理，删除了下标1的，下标2的会变成下标1
    //所以删除数组内容的时候必须从大到小删除，
    //这里从大到小找查需要删除的数组元素的下标和id。
    while (length--) {
      if (this.items['data'][length]['checked'] === true) {
        idArray.push(this.items['data'][length]['id']);
        indexArray.push(this.items['data'][length]['index']);
      }
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const body = { idArray: idArray };
        this.http.post(api(url), body).subscribe(data => {
          if (data['code'] === 200) {
            //顺序遍历index数组，下标从大到小，删除数组元素
            let length = indexArray.length;
            for (let i = 0; i < length; i++) {
              this.items['data'].splice(indexArray[i], 1);
            }
            this.isDelete = true;
          } else if (data['code'] === 401) {
            alert(data['message']);
          } else {
            alert(data['message']);
          }
        });
      }
    });
  }

}