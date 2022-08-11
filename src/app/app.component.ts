import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { SurveyService } from './survey.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'meals-survey';
  mealsFromBording = true;
  canteenFoods = ['Hoppers', 'Milk Rice', 'Rice & Curry'];
  orderingFoods = ['Hoppers', 'Milk Rice', 'Rice & Curry'];
  isCanteenFoods = false;
  isOrderingFoods = false;
  mealGetFrom: string[] = [];
  pickedCanteenFoods: string[] = [];
  pickedOrderingFoods: string[] = [];

  constructor(private fb: FormBuilder, private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.initializeGoogleSheet();
  }

  initializeGoogleSheet() {
    console.log('Calling method: initializeGoogleSheet()');
  }
  mealFrom: FormGroup = this.fb.group({
    boarding: [false],
    canteen: [false],
    ordering: [false],
  });

  firstFormGroup: FormGroup = this.fb.group({
    mealFrom: [[], ValidateMealFrom],
  });

  secondFormGroup = this.fb.group({
    mealFrom: ['', Validators.required],
  });
  thirdFormGroup = this.fb.group({
    mealFrom: ['', Validators.required],
  });
  forthFormGroup = this.fb.group({
    email: ['', Validators.required],
    comment: ['', Validators.required],
  });

  firstNext(stepper: MatStepper) {
    if (this.firstFormGroup.valid) {
      stepper.next();
    }
  }
  secondNext(stepper: MatStepper) {
    if (this.secondFormGroup.valid) {
      stepper.next();
    }
  }
  thirdNext(stepper: MatStepper) {
    if (this.thirdFormGroup.valid) {
      stepper.next();
    }
  }

  change() {
    console.log(this.firstFormGroup.value);
  }

  handleChange(event: any) {
    let { boarding, canteen, ordering } = this.mealFrom.value;

    this.isCanteenFoods = canteen;
    this.isOrderingFoods = ordering;
    let key = event.source.value;
    console.log(key);
    console.log(key + ' :' + JSON.stringify(this.mealFrom.value));

    if (event.checked) {
      if (key === 'canteen') {
        this.firstFormGroup.addControl(
          'pickedCanteenFoods',
          new FormControl([], ValidateMealFrom)
        );
        this.firstFormGroup.addControl(key, new FormGroup({}));
      }
      if (key === 'ordering') {
        this.firstFormGroup.addControl(
          'pickedOrderingFoods',
          new FormControl([], ValidateMealFrom)
        );
        this.firstFormGroup.addControl(key, new FormGroup({}));
        this.firstFormGroup.addControl(
          'collectingTime',
          new FormControl('', Validators.required)
        );
      }
      this.mealGetFrom.push(key);
      this.firstFormGroup.controls['mealFrom'].setValue(this.mealGetFrom);
      if (key !== 'boarding') {
        this.mealsFromBording = false;
      }
    }
    if (!canteen && !ordering) {
      this.mealsFromBording = true;
    }

    if (key == 'boarding' && !boarding) {
      this.firstFormGroup.removeControl('boarding');
      this.removeItemByName(key, this.mealGetFrom);
      this.firstFormGroup.controls['mealFrom'].setValue(this.mealGetFrom);
    }
    if (key == 'canteen' && !canteen) {
      this.firstFormGroup.removeControl('canteen');
      this.firstFormGroup.removeControl('pickedCanteenFoods');
      //this.firstFormGroup.updateValueAndValidity;
      this.removeItemByName(key, this.mealGetFrom);
      this.firstFormGroup.controls['mealFrom'].setValue(this.mealGetFrom);
      this.pickedCanteenFoods = [];
    }
    if (key == 'ordering' && !ordering) {
      this.firstFormGroup.removeControl('ordering');
      this.firstFormGroup.removeControl('pickedOrderingFoods');
      this.firstFormGroup.removeControl('collectingTime');

      this.removeItemByName(key, this.mealGetFrom);
      this.firstFormGroup.controls['mealFrom'].setValue(this.mealGetFrom);
      this.pickedOrderingFoods = [];
    }
    console.log(this.firstFormGroup);
  }

  showCanteenOptions(event: any) {
    console.log(event.source.value + ' : ' + event.checked); //true or false
    let key: string = event.source.value;
    let canteen = this.firstFormGroup.get('canteen') as FormGroup;
    if (event.checked) {
      //need to add form controller
      canteen.addControl(
        key,
        this.fb.control('', [
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ])
      );
      this.pickedCanteenFoods.push(key);
    } else {
      //need to remove existing form controller
      canteen.removeControl(key);
      this.removeItemByName(key, this.pickedCanteenFoods);
    }
    console.log(this.firstFormGroup);
    console.log(this.pickedCanteenFoods);
    this.firstFormGroup.controls['pickedCanteenFoods'].setValue(
      this.pickedCanteenFoods
    );
  }

  showOrderingOptions(event: any) {
    console.log(event.source.value + ' : ' + event.checked); //true or false
    let key: string = event.source.value;
    let ordering = this.firstFormGroup.get('ordering') as FormGroup;
    if (event.checked) {
      //need to add form controller
      ordering.addControl(
        key,
        this.fb.control('', [
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ])
      );
      this.pickedOrderingFoods.push(key);
    } else {
      //need to remove existing form controller
      ordering.removeControl(key);
      this.removeItemByName(key, this.pickedOrderingFoods);
    }
    console.log(this.firstFormGroup);
    console.log(this.pickedOrderingFoods);
    this.firstFormGroup.controls['pickedOrderingFoods'].setValue(
      this.pickedOrderingFoods
    );
  }

  submit(): void {
    if (this.forthFormGroup.valid) {
      console.log(
        'Submiting...' + JSON.stringify(this.firstFormGroup.getRawValue())
      );
      console.log(
        'Submiting...' + JSON.stringify(this.secondFormGroup.getRawValue())
      );
      console.log(
        'Submiting...' + JSON.stringify(this.thirdFormGroup.getRawValue())
      );
      console.log(
        'Submiting...' + JSON.stringify(this.forthFormGroup.getRawValue())
      );
      //saving data in firebase
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

  removeItemByName(item: string, items: string[]) {
    const index = items.indexOf(item);
    if (index !== -1) {
      items.splice(index, 1);
    }
  }
}

function ValidateMealFrom(
  control: AbstractControl
): { [key: string]: any } | null {
  if (control.value.length < 1) {
    return { nonValidateMealFrom: true };
  }
  return null;
}
