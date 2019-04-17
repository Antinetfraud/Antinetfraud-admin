import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { active } from '../../functions/active';
import { api } from '../../functions/api';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  version: string;
  update_log: string;
  apk: Blob;
  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    active("上传APP");
  }

  getFile(e) {
    this.apk = (e.target.files[0]);
  }

  submit() {
    if (this.version === undefined || this.update_log === undefined) {
      alert("版本号和更新日志不能为空！");
    } else {
      //创建form对象
      let param = new FormData();
      //通过append向form对象添加数据
      param.append('apk', this.apk);

      //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      console.log(param.get('apk'));

      this.http.post(api('apk/upload/'), param).subscribe(data => {
        console.log(data);
        if (data['code'] === 200) {
          let body = { version: this.version, update_log: this.update_log, download: data['path'] };
          this.http.post(api('app/create/'), body).subscribe(data => {
            if (data['code'] === 200) {
              alert("上传成功");
            } else {
              alert("上传失败");
              console.log(data);
            }
          });
        } else {
          console.log(data);
        }
      });
    }

  }

}
