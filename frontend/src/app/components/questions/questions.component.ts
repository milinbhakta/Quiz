import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions = {} ;
  quizId;

  constructor(public api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    console.log(this.quizId);
    this.api.getQuestions(this.quizId).subscribe(res => {
      this.questions = res;
    });
  }

}
