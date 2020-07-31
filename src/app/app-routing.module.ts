import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ChatBoardComponent } from './chat-board/chat-board.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);
const redirectLoggedInToChat = () => redirectLoggedInTo(['chat']);

const routes: Routes = [
  {path: '', component: LandingPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToChat }}, 
  {path: 'chat', component: ChatBoardComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }}, 
  {path: '**', redirectTo: '/chat'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
