import {Component, OnDestroy, OnInit} from '@angular/core';
import { BackendService } from '../../../backend.service';
import { Room } from '../../../models/room';
import { TrainerWorkout } from '../../../models/trainer-workout';
import { Timetable } from '../../../models/Timetable';
import { Workout } from '../../../models/workout';
import { SessionStorageService } from 'ngx-webstorage/dist/services';
import { Trainer } from "../../../models/user";
import {Router} from "@angular/router";

@Component( {
    selector: 'app-update-timetable',
    templateUrl: './update-timetable.component.html',
    styleUrls: ['./update-timetable.component.css']
} )
export class UpdateTimetableComponent implements OnInit, OnDestroy {

    allTimetables: Timetable[] = [];
    allRooms: Room[] = [];
    allWorkouts: TrainerWorkout[] = [];
    allTrainers: Trainer[] = [];
    timetableToCreate: Timetable;
    message = '';

    constructor( private backendService: BackendService , private session: SessionStorageService, private router: Router) { }
    ngOnInit() {
        this.getTrainers();
        this.getRooms();
        this.getWorkouts();
        this.timetableToCreate = this.session.retrieve('timetableToUpdate') ;
        this.timetableToCreate.roomName = this.timetableToCreate.room.roomName;
        this.timetableToCreate.workoutType = this.timetableToCreate.workout.workoutType;
        this.timetableToCreate.start = new Date(this.timetableToCreate.start);
    }

    ngOnDestroy(): void {
      this.session.clear("timetableToUpdate");
    }

    findRoomByName(name: string ): Room {
        for (const i of this.allRooms) {
            if (i.roomName === name) {
                return i;
            }
        }
        return null;
      }

    updateTimetable(): void {
        const roomName = this.timetableToCreate.roomName;
        const workoutType = this.timetableToCreate.workoutType;
        const room = this.findRoomByName(roomName);
        const workout = this.findWorkoutByType(workoutType);
        this.timetableToCreate.trainer = this.findTrainerById(this.timetableToCreate.trainer.id);
        this.timetableToCreate.room = room ;
        this.timetableToCreate.workout = workout.workout ;
        this.backendService.updateTimetable(this.timetableToCreate).subscribe(res => {
        this.message = res;
        setTimeout(()=> {
            this.message = "";
            console.log("lol");
          }, 5000);

        });
      }

    findWorkoutByType(type: string ): TrainerWorkout {
        for (const i of this.allWorkouts) {
            if (i.workout.workoutType === type) {
                return i;
            }
        }
        return null;
      }
    findTrainerById(id: number ): Trainer {
        for (const i of this.allTrainers) {
            if (i.id === id) {
                return i;
            }
        }
        return null;
      }
    getRooms(): void {
        this.backendService.getAllRooms().subscribe( res => {
            this.allRooms = res;
            console.log( this.allRooms );
        } );
    }
    getWorkouts(): void {
        this.backendService.getAllWorkouts().subscribe( res => {
            this.allWorkouts = res;
            console.log( this.allWorkouts );
        } );
    }
    getTrainers(): void {
        this.backendService.getAllTrainers().subscribe( res => {
            this.allTrainers = res;
            for ( let trainer of this.allTrainers ) {
                if ( trainer.imageBase64 == null ) {
                    trainer.imageBase64 = '';
                }

            }
            console.log( this.allTrainers );
        } );
    }
}
