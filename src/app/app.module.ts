import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkillsComponent } from './projecte/components/skills/skills.component';
import { HeroesComponent } from './projecte/components/heroes/heroes.component';
import { CompatibilitiesComponent } from './projecte/components/compatibilities/compatibilities.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SkillsComponent,
    HeroesComponent,
    CompatibilitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
