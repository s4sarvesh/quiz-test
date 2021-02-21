import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class QuizService {
    public questions: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    public questionsMetaInfo: BehaviorSubject<any> = new BehaviorSubject<any>({
        'name': '',
        'allotedTime': 0
    });

    constructor(private http: HttpClient) { }

    fetchQuizList() {
        return this.http.get('data/quiz.json');
    }

    setQuizQuestion(data: []) {
        this.questions.next(data);
    }

    getQuizQuestion() {
        return this.questions.getValue();
    }

    setQuizQuestionMeta(data: any) {
        this.questionsMetaInfo.next(data);
    }

    getQuestionMeta() {
        return this.questionsMetaInfo.getValue();
    }

}