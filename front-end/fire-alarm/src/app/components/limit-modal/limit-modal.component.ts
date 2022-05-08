import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-limit-modal',
  templateUrl: './limit-modal.component.html',
  styleUrls: ['./limit-modal.component.scss']
})
export class LimitModalComponent implements OnInit {
  @Input() limit:any;
  public updateForm:any;
  constructor(public activeModal: NgbActiveModal) {}
  
  ngOnInit(): void {
    this.updateForm = new FormGroup({
      newValue: new FormControl(this.limit, [Validators.required]),
    })
    
  }
  changeLimit(){
    this.activeModal.close(this.updateForm.controls['newValue'].value);
  }

  close(){
    this.activeModal.close(false)
  }

}
