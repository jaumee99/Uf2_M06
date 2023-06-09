import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Arma {
  name: string;
  damage: number;
  velocity: number;
  range: number;
}

@Component({
  selector: 'app-armes',
  templateUrl: './armes.component.html',
  styleUrls: ['./armes.component.css']
})
export class ArmesComponent implements OnInit {

  armaForm: FormGroup;
  arma: Arma = {
    name: '',
    damage: 10,
    velocity: 10,
    range: 10
  };
  armes: Arma[] = [];
  editIndex: number | null = null;
  errorMessages: string[] = [];
  damageValue: number = this.arma.damage;
  velocityValue: number = this.arma.velocity;
  rangeValue: number = this.arma.range;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.armaForm = this.formBuilder.group({
      name: ['', Validators.required],
      damage: [10, Validators.required],
      velocity: [10, Validators.required],
      range: [10, Validators.required]
    });
  }

  ngOnInit() {
    const savedArmes = localStorage.getItem('armes');
    if (savedArmes) {
      this.armes = JSON.parse(savedArmes);
    }
  }

  saveArma() {
    this.submitted = true;
    this.errorMessages = [];

    if (this.armaForm.invalid) {
      return;
    }

    const { name, damage, velocity, range } = this.armaForm.value;

    if (!name) {
      this.errorMessages.push('El nom de l\'arma és obligatori.');
    }

    if (!damage) {
      this.errorMessages.push('El dany de l\'arma és obligatori.');
    }

    if (!velocity) {
      this.errorMessages.push('La velocitat de l\'arma és obligatòria.');
    }

    if (!range) {
      this.errorMessages.push('El rang de l\'arma és obligatori.');
    }

    if (damage + velocity + range !== 100) {
      this.errorMessages.push('La suma del dany, la velocitat i el rang ha de ser 100.');
    }

    if (this.isArmaNameDuplicate(name)) {
      this.errorMessages.push('El nom de l\'arma ja existeix.');
    }

    if (this.errorMessages.length === 0) {
      if (this.editIndex === null) {
        this.armes.push({ name, damage, velocity, range });
      } else {
        this.armes[this.editIndex] = { name, damage, velocity, range };
      }
      this.armaForm.reset();
      this.editIndex = null;
      localStorage.setItem('armes', JSON.stringify(this.armes));
    }

    this.submitted = false;
  }

  isArmaNameDuplicate(name: string): boolean {
    return this.armes.some((arma, index) => {
      return arma.name === name && index !== this.editIndex;
    });
  }

  editArma(index: number) {
    this.arma = this.armes[index];
    this.editIndex = index;
    this.armaForm.patchValue(this.arma);
  }

  deleteArma(index: number) {
    this.armes.splice(index, 1);
    localStorage.setItem('armes', JSON.stringify(this.armes));
  }

  saveArmes() {
    localStorage.setItem('armes', JSON.stringify(this.armes));
  }
}
