import { Component } from '@angular/core';

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
export class ArmesComponent {

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

  ngOnInit() {
    const savedArmes = localStorage.getItem('armes');
    if (savedArmes) {
      this.armes = JSON.parse(savedArmes);
    }
  }

  saveArma() {
    this.errorMessages = [];

    if (!this.arma.name) {
      this.errorMessages.push('El nom de l\'arma és obligatori.');
    }

    if (!this.arma.damage) {
      this.errorMessages.push('El dany de l\'arma és obligatori.');
    }

    if (!this.arma.velocity) {
      this.errorMessages.push('La velocitat de l\'arma és obligatòria.');
    }

    if (!this.arma.range) {
      this.errorMessages.push('El rang de l\'arma és obligatori.');
    }

    if (this.arma.damage + this.arma.velocity + this.arma.range !== 100) {
      this.errorMessages.push('La suma del dany i el mana ha de ser 100.');
    }

    if (this.isArmaNameDuplicate(this.arma.name)) {
      this.errorMessages.push('El nom de l\'arma ja existeix.');
    }

    if (this.errorMessages.length === 0) {
      if (this.editIndex === null) {
        this.armes.push(this.arma);
      } else {
        this.armes[this.editIndex] = this.arma;
      }
      this.arma = {
        name: '',
        damage: 0,
        velocity: 0,
        range: 0
      };
      this.editIndex = null;
      localStorage.setItem('armes', JSON.stringify(this.armes));
    }
  }

  isArmaNameDuplicate(name: string): boolean {
    return this.armes.some((arma, index) => {
      return arma.name === name && index !== this.editIndex;
    });
  }

  editArma(index: number) {
    this.arma = this.armes[index];
    this.editIndex = index;
  }

  deleteArma(index: number) {
    this.armes.splice(index, 1);
    localStorage.setItem('armes', JSON.stringify(this.armes));
  }

  saveArmes() {
    localStorage.setItem('armes', JSON.stringify(this.armes));
  }
}
