import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css'],
    inputs: ['sum', 'current', 'url']
})

export class PaginatorComponent implements OnInit {

    public sum: number;
    public current: number;
    public selected: number;
    public url: string;
    public list: Array<item>;

    constructor(private router: Router) { }

    ngOnInit() {
        console.log("helo");
        this.selected = this.current;
        this.list = [];
        for (let i = 1; i <= this.sum; i++) {
            let temp = new item(i, this.url + i);
            this.list.push(temp);
        }
    }

    change() {
        if (this.selected !== this.current) {
            //因为我是从1开始算的，所以数组下标需要减一
            this.router.navigate([this.list[this.selected - 1].url]);
        }
    }

}

class item {
    public number: number;
    public url: string;

    constructor(number: number, url: string) {
        this.number = number;
        this.url = url;
    }
}
