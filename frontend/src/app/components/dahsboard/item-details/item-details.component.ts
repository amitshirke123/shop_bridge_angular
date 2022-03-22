import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
//import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';
import { Observable, Subscription } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';
import { Item } from 'src/app/models/item';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from "rxjs/operators"

const baseUrl = environment.baseUrl;

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  public displayedColumns = ['id', 'name', 'description', 'price','action'];
  public dataSource = new MatTableDataSource;
  @ViewChild('paginator', { static: false })
  paginator!: MatPaginator;
  loader = false;
  filteredOptions!: Observable<string[]>;
  products = [];
  product_name: any;
  searchForm: FormGroup =  new FormGroup({
    name: new FormControl()
  });

  obs!:Subscription;

  constructor(private httpService: HttpService, private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.obs=this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => 
          this.dataSource.filter = data.name?.trim().toLowerCase()
      );
    this.retrieveProducts();
  }
  
  retrieveProducts(): void {
    this.loader = true;
    let headers = {'No-Auth': 'True'};
    this.httpService.get(baseUrl, headers)
      .subscribe(
        data => {
          this.loader = false;
          this.products = [];
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        },
        error => {
          this.loader = false;
        });
  }


  deleteItem(product: Item): void {
    this.loader = true;
    let url = baseUrl+"/"+product.id
    this.httpService.delete(url)
      .subscribe(
        response => {
          console.log(response)
          this.loader = false;
          this.retrieveProducts();
        },
        error => {
          this.loader = false;
        });
  }


  openAddEditModal(action: string, element: any) {

    const dialogConfig = new MatDialogConfig();
    if (action === 'View/Edit') {
      dialogConfig.data = {
        'formData': element,
        'action': action
      };
    } else if (action == 'Add') {
      dialogConfig.data = {
        'action': action
      };
    }
    const dialogRef = this.matDialog.open(AddEditModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      this.retrieveProducts();
    });

  }

  
  
  onClear(){
    this.retrieveProducts();
  }


}


