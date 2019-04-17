import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'reply-dialog',
	templateUrl: './reply-dialog.html',
})
export class ReplyDialog {

	public replyContent: string;

	constructor(
		public dialogRef: MatDialogRef<ReplyDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onNoClick(): void {
		this.dialogRef.close();
	}

}