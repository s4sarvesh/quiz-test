import { Component, OnInit, AfterViewInit } from '@angular/core';
import { QuizService } from './../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, AfterViewInit {

  constructor(public quizService: QuizService, private router: Router) { }
  finalResultObject: any = { right: 0, wrong: 0, unattempted: 0 };
  questionsLength = 0;

  ngOnInit(): void {
    this.finalResult();
  }

  ngAfterViewInit() {
    if (this.quizService.getQuizQuestion().length == 0) {
      this.router.navigate(['/home']);
    }
  }

  finalResult() {
    let unattempted = 0;
    let right = 0;
    let wrong = 0;
    this.questionsLength = this.quizService.getQuizQuestion().length;
    this.quizService.getQuizQuestion().forEach(q => {
      if (q.selectedAnswers.length == 0) {
        q.result = 'Unattempted';
        unattempted++;
        return;
      }
      const answers = q.answers.sort();
      const selectedAnswers = q.selectedAnswers.sort();
      if (JSON.stringify(answers) == JSON.stringify(selectedAnswers)) {
        q.result = 'Right';
        right++;
      }
      else {
        q.result = 'Wrong';
        wrong++;
      }
    });
    this.finalResultObject = { right: right, wrong: wrong, unattempted: unattempted };
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
