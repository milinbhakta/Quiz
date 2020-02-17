import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private accessPointUrl = 'https://localhost:44399/api/questions';
  private quizUrl = 'https://localhost:44399/api/quizzes';
  private selectedQuestion = new Subject<any>();
  questionSelected = this.selectedQuestion.asObservable();

  private selectedQuiz = new Subject<any>();
  quizSelected = this.selectedQuiz.asObservable();

  constructor(private http: HttpClient) { }

  postQuestion(question) {
    this.http.post(this.accessPointUrl, question).subscribe(res => {
      console.log(res);
    });
  }

  putQuestion(question) {
    this.http.put(`${this.accessPointUrl}/${question.id}`, question).subscribe(res => {
      console.log(res);
    });
  }

  getQuestions(quizId) {
    return this.http.get(`${this.accessPointUrl}/${quizId}`);
  }

  selectQuestion(question) {
    console.log(question);
    this.selectedQuestion.next(question);
  }

  postQuiz(quiz) {
    this.http.post(this.quizUrl, quiz).subscribe(res => {
      console.log(res);
    });
  }

  selectQuiz(quiz) {
    console.log(quiz);
    this.selectedQuiz.next(quiz);
  }

  putQuiz(quiz) {
    this.http.put(`${this.quizUrl}/${quiz.id}`, quiz).subscribe(res => {
      console.log(res);
    });
  }

  getQuizzes() {
    return this.http.get(this.quizUrl);
  }

  getAllQuizzes() {
    return this.http.get(`${this.quizUrl}/all`);
  }

}
