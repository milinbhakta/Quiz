import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FinishedComponent } from './../finished/finished.component';


@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {

  quizId;
  questions;
  step = 0;
  constructor(public api: ApiService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    console.log(this.quizId);
    this.api.getQuestions(this.quizId).subscribe(res => {
      console.log(res);
      this.questions = res;
      this.questions.forEach(q => {
        q.answers = [q.correctAnswer, q.answer1, q.answer2, q.answer3];
        this.shuffle(q.answers);
      });
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  finish() {
    let correct = 0;
    this.questions.forEach(q => {
      if (q.correctAnswer === q.selectedAnswer) {
        correct++;
      }
    });

    const dialogRef = this.dialog.open(FinishedComponent, {
      width: '250px',
      data: {correct, total: this.questions.length}
    });
  }

}
