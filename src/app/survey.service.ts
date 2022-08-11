import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Meal from './models/meal.model';
import MealComment from './models/meal-comment.model';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  recordRef!: AngularFireList<Meal | MealComment>;

  constructor(private db: AngularFireDatabase) {}

  pushRecord(refName: string, record: Meal | MealComment) {
    this.recordRef = this.db.list('/' + refName);
    this.recordRef
      .push(record)
      .then((result) => {
        console.log('Record saving completed...' + result);
      })
      .catch((error) => {
        console.log('Error ocures with record saving...' + error);
      });
  }
}
