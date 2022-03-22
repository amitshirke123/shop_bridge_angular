import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';
import { ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment';

const baseUrl = environment.baseUrl;

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.scss']
})
export class AddEditModalComponent implements OnInit {

  itemDetailsForm!: FormGroup;
  loader = false;
  @ViewChild('autosize')
  autosize: any;


  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddEditModalComponent>,
  private httpService: HttpService, private matDialog: MatDialog, private fb: FormBuilder) {  
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
      this.itemDetailsForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['',Validators.required],
    });

    if(this.data.action === 'View/Edit'){
      this.setData();
    }
  }


  setData(){
    this.itemDetailsForm.patchValue({
      'name': this.data.formData.name,
      'description': this.data.formData.description,
      'price': this.data.formData.price,
    })


  }


  updateItem(): void {
    this.loader = true;
    let data = {
      'id': this.data.formData.id,
      'name': this.itemDetailsForm.value.name,
      'description': this.itemDetailsForm.value.description,
      'price': this.itemDetailsForm.value.price
    }
    let headers = {
      "Content-Type": "application/json"
    }
    let url = baseUrl+"/"+this.data.formData.id;
    this.httpService.put(url, data, headers)
      .subscribe(
        (response: any) => {
          this.loader = false;
          this.dialogRef.close();
        },
        (error: any) => {
          this.loader = false;
        });
  }


  saveItem(): void {
    this.loader = true;
    let headers = {
      "Content-Type": "application/json"
    }

    this.httpService.post(baseUrl,this.itemDetailsForm.value, headers)
      .subscribe(
        (response: any) => {
          this.loader = false;
          this.dialogRef.close();
        },
        (error: any) => {
          this.loader = false;
        });
  }



  close(){
    this.dialogRef.close();
  }

}