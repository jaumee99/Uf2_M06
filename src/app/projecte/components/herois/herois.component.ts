import { Component } from '@angular/core';

interface Hero {
  name: string;
  armas: string[];
}

@Component({
  selector: 'app-herois',
  templateUrl: './herois.component.html',
  styleUrls: ['./herois.component.css']
})
export class HeroisComponent {
  hero: Hero = {
    name: '',
    armas: []
  };
  herois: Hero[] = [];
  editIndex: number | null = null;
  armas: string[] = [];
  selectedArmas: string[] = [];
  errorMessages: string[] = [];

  ngOnInit() {
    const savedHerois = localStorage.getItem('herois');
    if (savedHerois) {
      this.herois = JSON.parse(savedHerois);
    }
    const savedArmas = localStorage.getItem('armas');
    if (savedArmas) {
      this.armas = JSON.parse(savedArmas);
    }
  }

  saveHero() {
    this.errorMessages = [];

    if (!this.hero.name) {
      this.errorMessages.push('El nom del heroi és obligatori.');
    }

    if (this.isHeroNameDuplicate(this.hero.name)) {
      this.errorMessages.push('El nom del heroi ja existeix.');
    }

    if (this.errorMessages.length === 0) {
      if (this.editIndex !== null) {
        this.herois[this.editIndex] = { ...this.hero };
        this.editIndex = null;
      } else {
        this.herois.push({ ...this.hero });
      }
      this.hero = {
        name: '',
        armas: []
      };
      this.saveHeroisToLocalStorage();
    }
  }

  isHeroNameDuplicate(name: string): boolean {
    return this.herois.some(hero => hero.name.toLowerCase() === name.toLowerCase());
  }

  editHero(index: number) {
    this.editIndex = index;
    const hero = this.herois[index];
    this.hero = { ...hero };
  }

  deleteHero(index: number) {
    this.herois.splice(index, 1);
    this.saveHeroisToLocalStorage();
  }

  saveHeroisToLocalStorage() {
    localStorage.setItem('herois', JSON.stringify(this.herois));
  }
}