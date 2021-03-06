import { Component, OnInit } from '@angular/core';
import { Workout } from '../../../models/workout';
import { BackendService } from '../../../backend.service';
import { TrainerWorkout } from '../../../models/trainer-workout'
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs/Observable';

declare var showPleaseWait: any;
declare var hidePleaseWait: any;
@Component({
  selector: 'app-list-workout',
  templateUrl: './list-workout.component.html',
  styleUrls: ['./list-workout.component.css']
})
export class ListWorkoutComponent implements OnInit {

  selectedWorkout: Workout;

  allWorkouts: TrainerWorkout[] = [];
  descriptionFlag = false;
  selectedTrainerWorkout: TrainerWorkout;
  message = '';
  constructor(private backendService: BackendService, private router: Router , private session: SessionStorageService) { }

  ngOnInit() {
    this.getAllWorkouts();
  }

  getAllWorkouts() {
    showPleaseWait();
      this.backendService.getAllWorkouts().subscribe(res => {
        this.allWorkouts = res;
        hidePleaseWait();
        }
      );
      
        
    }
    

  update(workout: TrainerWorkout ): void {
    this.session.store('workoutToUpdate', workout);
    this.router.navigateByUrl('/updateworkout');
  }

  delete(workout: TrainerWorkout) {
      for ( let trainer of workout.trainers ) {
          if ( trainer.imageBase64 == null ) {
              trainer.imageBase64 = '';
          }
      }
    this.backendService.deleteWorkout(workout.workout).subscribe(res => {
      if(res === 'Successful'){
        this.message = res;
        const index = this.allWorkouts.findIndex(d => d.workout.idWorkout === workout.workout.idWorkout);
        this.allWorkouts.splice(index, 1);
        setTimeout(()=> {
          this.message = "";
          console.log("lol");
        }, 5000);
      }
      else{
          alert('This workout is still being used!');
      }
     
          

     
    });



    console.log(this.allWorkouts);
  }
  showDescription(x: TrainerWorkout) {
    console.log(this.descriptionFlag);
    this.selectedTrainerWorkout = x;
    if (this.descriptionFlag === false) {
      this.descriptionFlag = true;
    } else {
      this.descriptionFlag = false;
    }
  }
}
