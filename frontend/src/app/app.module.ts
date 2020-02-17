import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from './services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { QuestionComponent } from './components/question/question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { QuestionsComponent } from './components/questions/questions.component';
import {MatListModule} from '@angular/material/list';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizlistComponent } from './components/quizlist/quizlist.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthinterceptorService } from './services/authinterceptor.service';
import { LoginComponent } from './components/login/login.component';
import { PlayComponent } from './components/play/play.component';
import { PlayQuizComponent } from './components/play-quiz/play-quiz.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import { FinishedComponent } from './components/finished/finished.component';
import {MatDialogModule} from '@angular/material/dialog';


const appRoutes: Routes = [
  {
      path: 'question',
      component: QuestionComponent
  }, {
    path: 'question/:quizId',
    component: QuestionComponent
}, {
      path: 'questions',
      component: QuestionsComponent
  }, {
    path: '',
    component: HomeComponent
}, {
  path: 'quiz',
  component: QuizComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'play',
  component: PlayComponent
}, {
  path: 'playQuiz/:quizId',
  component: PlayQuizComponent
}
  ];

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionsComponent,
    HomeComponent,
    NavComponent,
    QuizComponent,
    QuizlistComponent,
    RegisterComponent,
    LoginComponent,
    PlayComponent,
    PlayQuizComponent,
    FinishedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatRadioModule,
    MatDialogModule
  ],
  providers: [ApiService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthinterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
