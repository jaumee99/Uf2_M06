import { Component, OnInit } from '@angular/core';

interface Heroe {
  name: string;
  description: string;
  strength: number;
  agility: number;
}

interface Arma {
  name: string;
  description: string;
  damage: number;
  mana: number;
}

@Component({
  selector: 'app-compatibilitat',
  templateUrl: './compatibilitat.component.html',
  styleUrls: ['./compatibilitat.component.css']
})
export class CompatibilitatComponent implements OnInit {
  heroes: Heroe[] = [];
  armas: Arma[] = [];
  compatibility: boolean[][] = [];

  ngOnInit() {
    const savedHeroes = localStorage.getItem('heroes');
    if (savedHeroes) {
      this.heroes = JSON.parse(savedHeroes);
    }

    const savedArmas = localStorage.getItem('armes');
    if (savedArmas) {
      this.armas = JSON.parse(savedArmas);
    }

    const savedCompatibility = localStorage.getItem('compatibility');
    if (savedCompatibility) {
      this.compatibility = JSON.parse(savedCompatibility);
    } else {
      this.buildCompatibility();
    }
  }

  buildCompatibility() {
    const heroNames = this.heroes.map(heroe => heroe.name);
    const weaponNames = this.armas.map(arma => arma.name);
    const numHeroes = heroNames.length;
    const numWeapons = weaponNames.length;

    this.compatibility = Array(numHeroes).fill(false).map(() => Array(numWeapons).fill(false));

    for (let i = 0; i < numHeroes; i++) {
      for (let j = 0; j < numWeapons; j++) {
        const heroe = this.heroes[i];
        const arma = this.armas[j];
        if (this.canHeroAcquireWeapon(heroe, arma)) {
          this.compatibility[i][j] = true;
        }
      }
    }
  }

  canHeroAcquireWeapon(heroe: Heroe, arma: Arma): boolean {
    // Lógica para determinar si un héroe puede adquirir un arma
    // Implementa tus propias reglas de compatibilidad aquí
    return false;
  }

  toggleCompatibility(heroeIndex: number, armaIndex: number) {
    this.compatibility[heroeIndex][armaIndex] = !this.compatibility[heroeIndex][armaIndex];
    localStorage.setItem('compatibility', JSON.stringify(this.compatibility));
  }
}
