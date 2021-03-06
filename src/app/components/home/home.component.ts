import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from './../../services/quiz.service';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  goToUrl: string;
  quizes: any[];
  quizName: string;
  constructor(private router: Router, public quizService: QuizService, private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    const quizes = this.quizService.fetchQuizList().subscribe((res: any) => {

      this.quizService.setQuizQuestionMeta({
        'name': res.name,
        'allotedTime': res.allotedTime
      })
      this.quizService.setQuizQuestion(res.questions);
    });
  }

  goToQuiz() {
    this.router.navigate(['/quiz']);
  }

}
