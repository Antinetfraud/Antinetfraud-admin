import { Router } from '@angular/router'

//分页通用组件类
export class paginator {
    public sum: number;
    public current: number;
    public selected: number;
    public url: string;
    public list: Array<item>;

    constructor(sum: number, current: number, url: string, private router: Router) {
        this.sum = sum;
        this.current = current;
        this.selected = current;
        this.url = url;
        this.list = [];
        for (let i = 1; i <= sum; i++) {
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