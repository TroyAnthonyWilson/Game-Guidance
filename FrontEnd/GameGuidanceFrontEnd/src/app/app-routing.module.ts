import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './gaurds/auth.guard';
import { RecommendedGamesComponent } from './components/recommended-games/recommended-games.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: 'login', component: UserLoginComponent},
  {path: 'signup', component: UserSignupComponent},
  {path: 'home', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: 'findNewGame', component: RecommendedGamesComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
