import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Meal from './models/meal.model';
import { SurveyService } from './survey.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'meals-survey';

  constructor(private surveyService: SurveyService) {}

  saveRecord() {
    console.log('calling save method...');
    this.surveyService.pushRecord('dinner', {
      user: 'joney@gmail.com',
      food: 'Fried Rice',
      price: 38,
      receivedTime: '2.00 PM',
    });
    this.surveyService.pushRecord('comment', {
      user: 'joney@gmail.com',
      comment: 'test comment',
    });
  }
}
