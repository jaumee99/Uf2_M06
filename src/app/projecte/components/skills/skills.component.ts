import { Component } from '@angular/core';

interface Skill {
  name: string;
  description: string;
  damage: number;
  mana: number;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  skill: Skill = {
    name: '',
    description: '',
    damage: 0,
    mana: 0
  };
  skills: Skill[] = [];
  editIndex: number | null = null;
  namePattern = /^[A-Z][a-zA-Z\s]{2,19}$/;
  errorMessages: string[] = [];

  ngOnInit() {
    const savedSkills = localStorage.getItem('skills');
    if (savedSkills) {
      this.skills = JSON.parse(savedSkills);
    }
  }

  saveSkill() {
    this.errorMessages = [];

    if (!this.skill.name) {
      this.errorMessages.push('El nom de l\'habilitat és obligatori.');
    }

    if (!this.skill.description) {
      this.errorMessages.push('La descripció de l\'habilitat és obligatòria.');
    }

    if (!this.skill.damage) {
      this.errorMessages.push('El dany de l\'habilitat és obligatori.');
    }

    if (!this.skill.mana) {
      this.errorMessages.push('El mana de l\'habilitat és obligatori.');
    }

    if (!this.namePattern.test(this.skill.name)) {
      this.errorMessages.push('El nom de l\'habilitat no compleix el format requerit.');
    }

    if (this.isSkillNameDuplicate(this.skill.name)) {
      this.errorMessages.push('El nom de l\'habilitat ja existeix.');
    }

    if (this.skill.damage + this.skill.mana !== 100) {
      this.errorMessages.push('La suma del dany i el mana ha de ser 100.');
    }

    if (this.errorMessages.length === 0) {
      if (this.editIndex !== null) {
        this.skills[this.editIndex] = { ...this.skill };
        this.editIndex = null;
      } else {
        this.skills.push({ ...this.skill });
      }
      this.skill = {
        name: '',
        description: '',
        damage: 0,
        mana: 0
      };
      this.saveSkillsToLocalStorage();
    }
  }

  isSkillNameDuplicate(name: string): boolean {
    return this.skills.some(skill => skill.name.toLowerCase() === name.toLowerCase());
  }

  editSkill(index: number) {
    this.editIndex = index;
    const skill = this.skills[index];
    this.skill = { ...skill };
    this.skills.splice(index, 1);
  }

  deleteSkill(index: number) {
    this.skills.splice(index, 1);
    this.saveSkillsToLocalStorage();
  }

  saveSkillsToLocalStorage() {
    localStorage.setItem('skills', JSON.stringify(this.skills));
  }
}
