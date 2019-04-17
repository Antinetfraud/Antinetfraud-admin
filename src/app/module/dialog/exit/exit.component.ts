import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'exit-dialog',
  templateUrl: './exit-dialog.html',
})
export class ExitDialog {

  constructor(
    public dialogRef: MatDialogRef<ExitDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
