import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompatibilitiesComponent } from './projecte/components/compatibilities/compatibilities.component';
import { HeroesComponent } from './projecte/components/heroes/heroes.component';
import { SkillsComponent } from './projecte/components/skills/skills.component';
import { HeroisComponent } from './projecte/components/herois/herois.component';
import { ArmesComponent } from './projecte/components/armes/armes.component';
import { TipusComponent } from './projecte/components/tipus/tipus.component';
import { CompatibilitatComponent } from './projecte/components/compatibilitat/compatibilitat.component';

const routes: Routes = [
  { path: 'compatibilities', component: CompatibilitiesComponent },
  { path: 'hero', component: HeroesComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'armes', component: ArmesComponent },
  { path: 'herois', component: HeroisComponent },
  { path: 'tipus', component: TipusComponent },
  { path: 'compatibilitat', component: CompatibilitatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
