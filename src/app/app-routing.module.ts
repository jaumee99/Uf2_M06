import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompatibilitiesComponent } from './projecte/components/compatibilities/compatibilities.component';
import { HeroesComponent } from './projecte/components/heroes/heroes.component';
import { SkillsComponent } from './projecte/components/skills/skills.component';

const routes: Routes = [
  { path: 'compatibilities', component: CompatibilitiesComponent },
  { path: 'hero', component: HeroesComponent },
  { path: 'skills', component: SkillsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
