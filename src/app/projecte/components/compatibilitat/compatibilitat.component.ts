import { Component, OnInit } from '@angular/core';

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
  armes: Arma[] = [];
  compatibility: boolean[][] = [];
  tipos: string[] = ['Pocio', 'Pocio mitjana', 'pocio potent'];

  ngOnInit() {
    const savedArmas = localStorage.getItem('armes');
    if (savedArmas) {
      this.armes = JSON.parse(savedArmas);
    }

    const savedCompatibility = localStorage.getItem('compatibility');
    if (savedCompatibility) {
      this.compatibility = JSON.parse(savedCompatibility);
    } else {
      this.buildCompatibility();
    }
  }

  buildCompatibility() {
    const armaNames = this.armes.map(arma => arma.name);
    const numArmas = armaNames.length;
    const numTipos = this.tipos.length;

    this.compatibility = Array(numTipos).fill(false).map(() => Array(numArmas).fill(false));

    for (let i = 0; i < numTipos; i++) {
      for (let j = 0; j < numArmas; j++) {
        const arma = this.armes[j];
        if (this.canHeroAcquireWeapon(this.tipos[i], arma)) {
          this.compatibility[i][j] = true;
        }
      }
    }
  }

  canHeroAcquireWeapon(tipo: string, arma: Arma): boolean {
    return false;
  }

  toggleCompatibility(tipoIndex: number, armaIndex: number) {
    this.compatibility[tipoIndex][armaIndex] = !this.compatibility[tipoIndex][armaIndex];
    localStorage.setItem('compatibility', JSON.stringify(this.compatibility));
  }
}
