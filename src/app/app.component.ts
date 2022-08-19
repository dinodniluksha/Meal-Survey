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

  //breakfast secion
  breakfastMealsFromBording = true;
  canteenBreakfastFoods = [
    'String Hoppers',
    'Hoppers',
    'Bread/Sandwiches',
    'Shortiess',
    'Milk Rice',
    'Rice & Curry',
    'Rice & Curry(Fish)',
    'Rice & Curry(Egg)',
  ];
  orderingBreakfastFoods = [
    'String Hoppers',
    'Hoppers',
    'Bread/Sandwiches',
    'Shortiess',
    'Milk Rice',
    'Rice & Curry',
    'Rice & Curry(Fish)',
    'Rice & Curry(Egg)',
  ];
  isCanteenBreakfastFoods = false;
  isOrderingBreakfastFoods = false;
  breakfastMealGetFrom: string[] = [];
  pickedCanteenBreakfastFoods: string[] = [];
  pickedOrderingBreakfastFoods: string[] = [];

  //lunch secion
  lunchMealsFromBording = true;
  canteenLunchFoods = [
    'Rice & Curry(Vegi)',
    'Rice & Curry(Fish)',
    'Rice & Curry(Egg)',
    'Rice & Curry(Chicken)',
    'Fried Rice',
    'Yellow Rice',
  ];
  orderingLunchFoods = [
    'Rice & Curry(Vegi)',
    'Rice & Curry(Fish)',
    'Rice & Curry(Egg)',
    'Rice & Curry(Chicken)',
    'Fried Rice',
    'Yellow Rice',
  ];
  isCanteenLunchFoods = false;
  isOrderingLunchFoods = false;
  lunchMealGetFrom: string[] = [];
  pickedCanteenLunchFoods: string[] = [];
  pickedOrderingLunchFoods: string[] = [];

  //dinner secion
  dinnerMealsFromBording = true;
  canteenDinnerFoods = [
    'String Hoppers',
    'Hoppers',
    'Bread/Sandwiches',
    'Rice & Curry(Vegi)',
    'Rice & Curry(Fish)',
    'Rice & Curry(Egg)',
    'Rice & Curry(Chicken)',
    'Fried Rice',
    'Yellow Rice',
  ];
  orderingDinnerFoods = [
    'String Hoppers',
    'Hoppers',
    'Bread/Sandwiches',
    'Rice & Curry(Vegi)',
    'Rice & Curry(Fish)',
    'Rice & Curry(Egg)',
    'Rice & Curry(Chicken)',
    'Fried Rice',
    'Yellow Rice',
  ];
  isCanteenDinnerFoods = false;
  isOrderingDinnerFoods = false;
  dinnerMealGetFrom: string[] = [];
  pickedCanteenDinnerFoods: string[] = [];
  pickedOrderingDinnerFoods: string[] = [];

  constructor(private fb: FormBuilder, private surveyService: SurveyService) {}

  ngOnInit(): void {}

  breakfastMealFrom: FormGroup = this.fb.group({
    boarding: [false],
    canteen: [false],
    ordering: [false],
  });

  lunchMealFrom: FormGroup = this.fb.group({
    boarding: [false],
    canteen: [false],
    ordering: [false],
  });

  dinnerMealFrom: FormGroup = this.fb.group({
    boarding: [false],
    canteen: [false],
    ordering: [false],
  });

  firstFormGroup: FormGroup = this.fb.group({
    mealFrom: [[], ValidateMealFrom],
  });

  secondFormGroup: FormGroup = this.fb.group({
    mealFrom: [[], ValidateMealFrom],
  });
  thirdFormGroup: FormGroup = this.fb.group({
    mealFrom: [[], ValidateMealFrom],
  });
  forthFormGroup: FormGroup = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@gmail.com$')],
    ],
    comment: [''],
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

  //begin of breakfast form's mechanism
  selectBreakfastOptions(event: any) {
    let { boarding, canteen, ordering } = this.breakfastMealFrom.value;

    this.isCanteenBreakfastFoods = canteen;
    this.isOrderingBreakfastFoods = ordering;
    let key = event.source.value;
    console.log(key);
    console.log(key + ' :' + JSON.stringify(this.breakfastMealFrom.value));

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
      this.breakfastMealGetFrom.push(key);
      this.firstFormGroup.controls['mealFrom'].setValue(
        this.breakfastMealGetFrom
      );
      if (key !== 'boarding') {
        this.breakfastMealsFromBording = false;
      }
    }
    if (!canteen && !ordering) {
      this.breakfastMealsFromBording = true;
    }

    if (key == 'boarding' && !boarding) {
      this.firstFormGroup.removeControl('boarding');
      this.removeItemByName(key, this.breakfastMealGetFrom);
      this.firstFormGroup.controls['mealFrom'].setValue(
        this.breakfastMealGetFrom
      );
    }
    if (key == 'canteen' && !canteen) {
      this.firstFormGroup.removeControl('canteen');
      this.firstFormGroup.removeControl('pickedCanteenFoods');
      this.removeItemByName(key, this.breakfastMealGetFrom);
      this.firstFormGroup.controls['mealFrom'].setValue(
        this.breakfastMealGetFrom
      );
      this.pickedCanteenBreakfastFoods = [];
    }
    if (key == 'ordering' && !ordering) {
      this.firstFormGroup.removeControl('ordering');
      this.firstFormGroup.removeControl('pickedOrderingFoods');
      this.firstFormGroup.removeControl('collectingTime');
      this.removeItemByName(key, this.breakfastMealGetFrom);
      this.firstFormGroup.controls['mealFrom'].setValue(
        this.breakfastMealGetFrom
      );
      this.pickedOrderingBreakfastFoods = [];
    }
    console.log(this.firstFormGroup);
  }

  //begin of lunch form's mechanism
  selectLunchOptions(event: any) {
    let { boarding, canteen, ordering } = this.lunchMealFrom.value;

    this.isCanteenLunchFoods = canteen;
    this.isOrderingLunchFoods = ordering;
    let key = event.source.value;
    console.log(key);
    console.log(key + ' :' + JSON.stringify(this.lunchMealFrom.value));

    if (event.checked) {
      if (key === 'canteen') {
        this.secondFormGroup.addControl(
          'pickedCanteenFoods',
          new FormControl([], ValidateMealFrom)
        );
        this.secondFormGroup.addControl(key, new FormGroup({}));
      }
      if (key === 'ordering') {
        this.secondFormGroup.addControl(
          'pickedOrderingFoods',
          new FormControl([], ValidateMealFrom)
        );
        this.secondFormGroup.addControl(key, new FormGroup({}));
        this.secondFormGroup.addControl(
          'collectingTime',
          new FormControl('', Validators.required)
        );
      }
      this.lunchMealGetFrom.push(key);
      this.secondFormGroup.controls['mealFrom'].setValue(this.lunchMealGetFrom);
      if (key !== 'boarding') {
        this.lunchMealsFromBording = false;
      }
    }
    if (!canteen && !ordering) {
      this.lunchMealsFromBording = true;
    }

    if (key == 'boarding' && !boarding) {
      this.secondFormGroup.removeControl('boarding');
      this.removeItemByName(key, this.lunchMealGetFrom);
      this.secondFormGroup.controls['mealFrom'].setValue(this.lunchMealGetFrom);
    }
    if (key == 'canteen' && !canteen) {
      this.secondFormGroup.removeControl('canteen');
      this.secondFormGroup.removeControl('pickedCanteenFoods');
      this.removeItemByName(key, this.lunchMealGetFrom);
      this.secondFormGroup.controls['mealFrom'].setValue(this.lunchMealGetFrom);
      this.pickedCanteenLunchFoods = [];
    }
    if (key == 'ordering' && !ordering) {
      this.secondFormGroup.removeControl('ordering');
      this.secondFormGroup.removeControl('pickedOrderingFoods');
      this.secondFormGroup.removeControl('collectingTime');
      this.removeItemByName(key, this.lunchMealGetFrom);
      this.secondFormGroup.controls['mealFrom'].setValue(this.lunchMealGetFrom);
      this.pickedOrderingLunchFoods = [];
    }
    console.log(this.secondFormGroup);
  }

  //begin of dinner form's mechanism
  selectDinnerOptions(event: any) {
    let { boarding, canteen, ordering } = this.dinnerMealFrom.value;

    this.isCanteenDinnerFoods = canteen;
    this.isOrderingDinnerFoods = ordering;
    let key = event.source.value;
    console.log(key);
    console.log(key + ' :' + JSON.stringify(this.dinnerMealFrom.value));

    if (event.checked) {
      if (key === 'canteen') {
        this.thirdFormGroup.addControl(
          'pickedCanteenFoods',
          new FormControl([], ValidateMealFrom)
        );
        this.thirdFormGroup.addControl(key, new FormGroup({}));
      }
      if (key === 'ordering') {
        this.thirdFormGroup.addControl(
          'pickedOrderingFoods',
          new FormControl([], ValidateMealFrom)
        );
        this.thirdFormGroup.addControl(key, new FormGroup({}));
        this.thirdFormGroup.addControl(
          'collectingTime',
          new FormControl('', Validators.required)
        );
      }
      this.dinnerMealGetFrom.push(key);
      this.thirdFormGroup.controls['mealFrom'].setValue(this.dinnerMealGetFrom);
      if (key !== 'boarding') {
        this.dinnerMealsFromBording = false;
      }
    }
    if (!canteen && !ordering) {
      this.dinnerMealsFromBording = true;
    }

    if (key == 'boarding' && !boarding) {
      this.thirdFormGroup.removeControl('boarding');
      this.removeItemByName(key, this.dinnerMealGetFrom);
      this.thirdFormGroup.controls['mealFrom'].setValue(this.dinnerMealGetFrom);
    }
    if (key == 'canteen' && !canteen) {
      this.thirdFormGroup.removeControl('canteen');
      this.thirdFormGroup.removeControl('pickedCanteenFoods');
      this.removeItemByName(key, this.dinnerMealGetFrom);
      this.thirdFormGroup.controls['mealFrom'].setValue(this.dinnerMealGetFrom);
      this.pickedCanteenLunchFoods = [];
    }
    if (key == 'ordering' && !ordering) {
      this.thirdFormGroup.removeControl('ordering');
      this.thirdFormGroup.removeControl('pickedOrderingFoods');
      this.thirdFormGroup.removeControl('collectingTime');
      this.removeItemByName(key, this.dinnerMealGetFrom);
      this.thirdFormGroup.controls['mealFrom'].setValue(this.dinnerMealGetFrom);
      this.pickedOrderingDinnerFoods = [];
    }
    console.log(this.thirdFormGroup);
  }

  pickCanteenBreakfastFoods(event: any) {
    console.log(event.source.value + ' : ' + event.checked); //true or false
    let key: string = event.source.value;
    let canteen = this.firstFormGroup.get('canteen') as FormGroup;
    if (event.checked) {
      //need to add form controller
      canteen.addControl(
        key,
        this.fb.control('', [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$|^0$/),
        ])
      );
      this.pickedCanteenBreakfastFoods.push(key);
    } else {
      //need to remove existing form controller
      canteen.removeControl(key);
      this.removeItemByName(key, this.pickedCanteenBreakfastFoods);
    }
    console.log(this.firstFormGroup);
    console.log(this.pickedCanteenBreakfastFoods);
    this.firstFormGroup.controls['pickedCanteenFoods'].setValue(
      this.pickedCanteenBreakfastFoods
    );
  }

  pickCanteenLunchFoods(event: any) {
    console.log(event.source.value + ' : ' + event.checked); //true or false
    let key: string = event.source.value;
    let canteen = this.secondFormGroup.get('canteen') as FormGroup;
    if (event.checked) {
      //need to add form controller
      canteen.addControl(
        key,
        this.fb.control('', [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$|^0$/),
        ])
      );
      this.pickedCanteenLunchFoods.push(key);
    } else {
      //need to remove existing form controller
      canteen.removeControl(key);
      this.removeItemByName(key, this.pickedCanteenLunchFoods);
    }
    console.log(this.secondFormGroup);
    console.log(this.pickedCanteenLunchFoods);
    this.secondFormGroup.controls['pickedCanteenFoods'].setValue(
      this.pickedCanteenLunchFoods
    );
  }

  pickCanteenDinnerFoods(event: any) {
    console.log(event.source.value + ' : ' + event.checked); //true or false
    let key: string = event.source.value;
    let canteen = this.thirdFormGroup.get('canteen') as FormGroup;
    if (event.checked) {
      //need to add form controller
      canteen.addControl(
        key,
        this.fb.control('', [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$|^0$/),
        ])
      );
      this.pickedCanteenDinnerFoods.push(key);
    } else {
      //need to remove existing form controller
      canteen.removeControl(key);
      this.removeItemByName(key, this.pickedCanteenDinnerFoods);
    }
    console.log(this.thirdFormGroup);
    console.log(this.pickedCanteenDinnerFoods);
    this.thirdFormGroup.controls['pickedCanteenFoods'].setValue(
      this.pickedCanteenDinnerFoods
    );
  }

  pickOrderingBreakfastFoods(event: any) {
    console.log(event.source.value + ' : ' + event.checked); //true or false
    let key: string = event.source.value;
    let ordering = this.firstFormGroup.get('ordering') as FormGroup;
    if (event.checked) {
      //need to add form controller
      ordering.addControl(
        key,
        this.fb.control('', [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$|^0$/),
        ])
      );
      this.pickedOrderingBreakfastFoods.push(key);
    } else {
      //need to remove existing form controller
      ordering.removeControl(key);
      this.removeItemByName(key, this.pickedOrderingBreakfastFoods);
    }
    console.log(this.firstFormGroup);
    console.log(this.pickedOrderingBreakfastFoods);
    this.firstFormGroup.controls['pickedOrderingFoods'].setValue(
      this.pickedOrderingBreakfastFoods
    );
  }

  pickOrderingLunchFoods(event: any) {
    console.log(event.source.value + ' : ' + event.checked); //true or false
    let key: string = event.source.value;
    let ordering = this.secondFormGroup.get('ordering') as FormGroup;
    if (event.checked) {
      //need to add form controller
      ordering.addControl(
        key,
        this.fb.control('', [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$|^0$/),
        ])
      );
      this.pickedOrderingLunchFoods.push(key);
    } else {
      //need to remove existing form controller
      ordering.removeControl(key);
      this.removeItemByName(key, this.pickedOrderingLunchFoods);
    }
    console.log(this.secondFormGroup);
    console.log(this.pickedOrderingLunchFoods);
    this.secondFormGroup.controls['pickedOrderingFoods'].setValue(
      this.pickedOrderingLunchFoods
    );
  }

  pickOrderingDinnerFoods(event: any) {
    console.log(event.source.value + ' : ' + event.checked); //true or false
    let key: string = event.source.value;
    let ordering = this.thirdFormGroup.get('ordering') as FormGroup;
    if (event.checked) {
      //need to add form controller
      ordering.addControl(
        key,
        this.fb.control('', [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$|^0$/),
        ])
      );
      this.pickedOrderingDinnerFoods.push(key);
    } else {
      //need to remove existing form controller
      ordering.removeControl(key);
      this.removeItemByName(key, this.pickedOrderingDinnerFoods);
    }
    console.log(this.thirdFormGroup);
    console.log(this.pickedOrderingDinnerFoods);
    this.thirdFormGroup.controls['pickedOrderingFoods'].setValue(
      this.pickedOrderingDinnerFoods
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
      // this.surveyService.pushRecord('dinner', {
      //   user: 'joney@gmail.com',
      //   food: 'Fried Rice',
      //   price: 38,
      //   receivedTime: '2.00 PM',
      // });
      // this.surveyService.pushRecord('comment', {
      //   user: 'joney@gmail.com',
      //   comment: 'test comment',
      // });
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
