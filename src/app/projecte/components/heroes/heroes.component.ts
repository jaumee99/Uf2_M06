import { Component } from '@angular/core';

interface Hero {
  name: string;
  description: string;
  skills: string[];
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  hero: Hero = {
    name: '',
    description: '',
    skills: []
  };
  heroes: Hero[] = [];
  editIndex: number | null = null;
  namePattern = /^[A-Z][A-Za-z\s]{2,20}$/;
  skills: string[] = [];
  selectedSkills: string[] = [];
  errorMessages: string[] = [];

  ngOnInit() {
    const savedHeroes = localStorage.getItem('heroes');
    if (savedHeroes) {
      this.heroes = JSON.parse(savedHeroes);
    }
    const savedSkills = localStorage.getItem('skills');
    if (savedSkills) {
      this.skills = JSON.parse(savedSkills);
    }
  }

  saveHero() {
    this.errorMessages = [];

    if (!this.hero.name) {
      this.errorMessages.push('El nom del heroi és obligatori.');
    }

    if (!this.hero.description) {
      this.errorMessages.push('La descripció del heroi és obligatòria.');
    }

    if (!this.namePattern.test(this.hero.name)) {
      this.errorMessages.push('El nom del heroi no compleix el format requerit (2-20 caràcters, sense números).');
    }

    if (this.isHeroNameDuplicate(this.hero.name)) {
      this.errorMessages.push('El nom del heroi ja existeix.');
    }

    if (this.errorMessages.length === 0) {
      if (this.editIndex !== null) {
        this.heroes[this.editIndex] = { ...this.hero };
        this.editIndex = null;
      } else {
        this.heroes.push({ ...this.hero });
      }
      this.hero = {
        name: '',
        description: '',
        skills: []
      };
      this.saveHeroesToLocalStorage();
    }
  }

  isHeroNameDuplicate(name: string): boolean {
    return this.heroes.some(hero => hero.name.toLowerCase() === name.toLowerCase());
  }

  editHero(index: number) {
    this.editIndex = index;
    const hero = this.heroes[index];
    this.hero = { ...hero };
  }

  deleteHero(index: number) {
    this.heroes.splice(index, 1);
    this.saveHeroesToLocalStorage();
  }

  saveHeroesToLocalStorage() {
    localStorage.setItem('heroes', JSON.stringify(this.heroes));
  }
}