import { enabledBtn, disabledBtn } from './button';

//抽象出来做一个checkbox类。
export class checkbox {
	private checkedNum: number = 0;
	private isSelectAll: boolean = false;

	constructor(private items: object) { }

	checked(item: object): void {
		item['checked'] = !item['checked'];
		if (item['checked'] === true) {
			this.checkedNum++;
		} else {
			this.checkedNum--;
		}
		this.watchChecked();
	}

	selectAll(): void {
		//获取所有的input标签对象
		let inputs = document.getElementsByTagName("input");
		//初始化空数组，用来存放checkbox对象。
		let checkboxArray = [];
		let length = inputs.length;
		for (let i = 0; i < length; i++) {
			let obj = inputs[i];
			if (obj.type == 'checkbox') {
				checkboxArray.push(obj);
			}
		}

		//如果是全部选中的情况下
		if (this.isSelectAll) {
			for (let i in this.items['data']) {
				this.items['data'][i].checked = false;
			}
			for (let i in checkboxArray) {
				checkboxArray[i].checked = false;
			}
			this.checkedNum = 0;
			this.isSelectAll = false;
		} else {
			//不是全部选中的情况下
			this.checkedNum = 0
			for (let i in this.items['data']) {
				this.items['data'][i].checked = true;
				this.checkedNum++;
			}
			for (let i in checkboxArray) {
				checkboxArray[i].checked = true;
			}
			this.isSelectAll = true;
		}
		this.watchChecked();
	}

	watchChecked(): void {
		if (this.checkedNum != 0) {
			enabledBtn('DeleteBtn', 'red lighten-2');
			let length = this.items['data'].length;
			if (this.checkedNum === length) {
				(<HTMLInputElement>document.getElementById('selectAll')).checked = true;
				this.isSelectAll = true;
			} else {
				(<HTMLInputElement>document.getElementById('selectAll')).checked = false;
				this.isSelectAll = false;
			}
		} else {
			disabledBtn('DeleteBtn');
			(<HTMLInputElement>document.getElementById('selectAll')).checked = false;
			this.isSelectAll = false;
		}
	}
}