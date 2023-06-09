import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipus',
  templateUrl: './tipus.component.html',
  styleUrls: ['./tipus.component.css']
})
export class TipusComponent implements OnInit {

  tipusForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.tipusForm = this.formBuilder.group({
      tipus: ['', Validators.required]
    });
  }

  ngOnInit() {
    const savedTipus = localStorage.getItem('tipus');
    if (savedTipus) {
      this.tipusForm.setValue({ tipus: savedTipus });
    }
  }

  saveTipus() {
    if (this.tipusForm.invalid) {
      return;
    }

    const tipusValue = this.tipusForm.value.tipus;
    const tipusArray = tipusValue.split(',').map((tipo: string) => tipo.trim());
    const uniqueTipus = [...new Set(tipusArray)];

    localStorage.setItem('tipus', uniqueTipus.join(','));
  }
}
