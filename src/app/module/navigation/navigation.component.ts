import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { api } from '../../functions/api';
import { ExitDialog } from '../dialog/exit/exit.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  animal: string;
  name: string;
  adminName: string;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.adminName = localStorage.getItem("adminName");
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ExitDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log("logout");
        this.http.post(api('logout'), {}).subscribe(data => {
          if (data['code'] === 200) {
            alert("登出成功");
            localStorage.clear();
            this.router.navigate(['/login']);
          } else {
            alert("未知错误,请查看log信息");
            console.log(data);
          }
        });
      }

    });
  }

}

