import { Component, OnInit } from '@angular/core';

interface Skill {
  name: string;
  description: string;
  damage: number;
  mana: number;
}

@Component({
  selector: 'app-compatibilities',
  templateUrl: './compatibilities.component.html',
  styleUrls: ['./compatibilities.component.css']
})
export class CompatibilitiesComponent implements OnInit {
  skills: Skill[] = [];
  compatibility: boolean[][] = [];

  ngOnInit() {
    const savedSkills = localStorage.getItem('skills');
    if (savedSkills) {
      this.skills = JSON.parse(savedSkills);
    }

    const savedCompatibility = localStorage.getItem('compatibility');
    if (savedCompatibility) {
      this.compatibility = JSON.parse(savedCompatibility);
    } else {
      this.buildCompatibility();
    }
  }

  buildCompatibility() {
    const skillNames = this.skills.map(skill => skill.name);
    const numSkills = skillNames.length;

    this.compatibility = Array(numSkills).fill(false).map(() => Array(numSkills).fill(false));

    for (let i = 0; i < numSkills; i++) {
      for (let j = 0; j < numSkills; j++) {
        if (i === j) {
          this.compatibility[i][j] = true;
        } else {
          const skillA = this.skills[i];
          const skillB = this.skills[j];
          if (this.areSkillsCompatible(skillA, skillB)) {
            this.compatibility[i][j] = true;
          }
        }
      }
    }
  }

  areSkillsCompatible(skillA: Skill, skillB: Skill): boolean {
    //
    return false;
  }

  toggleCompatibility(skillIndexA: number, skillIndexB: number) {
    this.compatibility[skillIndexA][skillIndexB] = !this.compatibility[skillIndexA][skillIndexB];
    localStorage.setItem('compatibility', JSON.stringify(this.compatibility));
  }

}
