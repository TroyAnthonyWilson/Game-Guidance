import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { AboutComponent } from './components/about/about.component';
import { RecommendedGamesComponent } from './components/recommended-games/recommended-games.component';

const routes: Routes = [
  {path: 'login', component: UserLoginComponent},
  {path: 'signup', component: UserSignupComponent},
  {path: 'findNewGame', component: RecommendedGamesComponent},
  {path: 'home', component: MainPageComponent},
  {path: 'about', component: AboutComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
