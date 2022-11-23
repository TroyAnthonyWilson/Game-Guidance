import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { RecommendedGamesComponent } from './recommended-games/recommended-games.component';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserSignupComponent,
    NavbarComponent,
    AboutComponent,
    RecommendedGamesComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
