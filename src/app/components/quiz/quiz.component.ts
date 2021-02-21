import { Component, OnInit, AfterViewInit } from '@angular/core';
import { QuizService } from './../../services/quiz.service';
import { timer } from 'rxjs';
import { UtilService } from './../../services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, AfterViewInit {

  constructor(public quizService: QuizService, public utilService: UtilService, private router: Router) { }

  timer: any = null;
  timeleft: number = 0;
  pageCounter: number = 1;
  questionsLength: number = 0;
  metaInfo: any;

  ngOnInit(): void {
    this.questionsLength = this.quizService.getQuizQuestion().length;
    this.metaInfo = this.quizService.getQuestionMeta();
    this.startTimer(this.metaInfo.allotedTime);
  }

  ngAfterViewInit() {
    if (this.quizService.getQuizQuestion().length == 0) {
      this.router.navigate(['/home']);
    }
  }

  startTimer(definedTImer) {
    this.timeleft = definedTImer * 60;
    if (this.timer) {
      this.stopTimer();
    }
    else {
      const source = timer(1000, 1000);
      this.timer = source.subscribe(val => {
        const time = val;
        if (time == ((definedTImer * 60) - 1)) {
          this.stopTimer();
          //this.router.navigate(['/result']);
        }
        this.timeleft = this.timeleft - 1;
      }
      );
    }
  }

  stopTimer() {
    if (this.timer) {
      this.timer.unsubscribe();
    }
  }

  goTo(type: string) {
    switch (type) {
      case 'next':
        this.pageCounter = this.pageCounter < this.questionsLength ? this.pageCounter + 1 : this.questionsLength;

        break;
      case 'previous':
        this.pageCounter = this.pageCounter > 1 ? this.pageCounter - 1 : 1;

        break

    }
  }

  onSelect(question: any, option: any, isChecked: boolean) {
    if (isChecked) {
      question.selectedAnswers.push(option.id);
    }
    else {
      question.selectedAnswers = question.selectedAnswers.filter(f => f !== option.id)
    }
  }

  complete() {
    this.router.navigate(['/result']);
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
