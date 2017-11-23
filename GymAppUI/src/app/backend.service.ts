import {Headers,Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Room} from "./models/room";
import {TrainerWorkout} from "./models/trainer-workout";
import {Workout} from "./models/workout";
import {Subscription} from "./models/subscriptionModel";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Timetable } from "./models/Timetable";

@Injectable()
export class BackendService {

    private headers: Headers;

    constructor(private http: Http){}

    public getAllRooms(): Observable<Room[]> {
        return this.http.get("http://localhost:9123/getallrooms",{headers: this.headers}).map(response => response.json()).catch(this.handleError)
    }

    public addRoom(room: Room): Observable<any> {
        return this.http.post("http://localhost:9123/addroom",room,{headers: this.headers}).map(response => response.json()).catch(this.handleError)
    }

    public deleteRoom(room: Room): Observable<any> {
        return this.http.post("http://localhost:9123/deleteroom",room,{headers: this.headers}).map(response => response.json()).catch(this.handleError)
    }

    public getAllTimetables(): Observable<Timetable[]> {
        return this.http.get("http://localhost:9123/getalltimetables",{headers: this.headers}).map(response => response.json()).catch(this.handleError)
    }

    public addTimetable(timetable: Timetable): Observable<any> {
        return this.http.post("http://localhost:9123/addtimetable",timetable,{headers: this.headers}).map(response => response.json()).catch(this.handleError)
    }

    public deleteTimetable(timetable: Timetable): Observable<any> {
        return this.http.post("http://localhost:9123/deletetimetable",timetable,{headers: this.headers}).map(response => response.json()).catch(this.handleError)
    }
    
    public updateTimetable(timetable: Timetable): Observable<any> {
        return this.http.post("http://localhost:9123/updatetimetable",timetable,{headers: this.headers}).map(response => response.json()).catch(this.handleError)
    }
    
    public addSubscription(subscription :Subscription): Observable<any>{
        return this.http.post("http://localhost:9123/createsubscription",subscription,{headers: this.headers}).map(response => response.json()).catch(this.handleError)
    }
    public findAllSubscriptions():Observable<Subscription[]>{
        return this.http.get("http://localhost:9123/listsubscription",{headers: this.headers}).map(response => response.json()).catch(this.handleError)
    }
    public deleteSubscription(subscription: Subscription) :Observable<any>{
        return this.http.post("http://localhost:9123/listsubscription",{headers:this.headers}).map(response => response.json()).catch(this.handleError)
    }

    private handleError(error: any): Observable<any>{
        console.error(error);
        return error.message || error;
    }

    // public getAllWorkouts(): Observable<Workout[]> {
    //     return this.http.get("http://localhost:9123/getallworkouts",{headers: this.headers}).map(response => response.json()).catch(this.handleError)
    // }

    //this actually only returns trainer workouts
    public getAllWorkouts(): Observable<TrainerWorkout[]> {
        return this.http.get("http://localhost:9123/gettrainerworkouts",{headers: this.headers}).map(response => response.json()).catch(this.handleError)
    }

    public addWorkout(trainerWorkout: TrainerWorkout): Observable<any> {
        return this.http.post("http://localhost:9123/addtrainerworkout",trainerWorkout,{headers: this.headers}).map(response => response.json()).catch(this.handleError)
    }

    public deleteWorkout(workout: Workout): Observable<any> {
        return this.http.post("http://localhost:9123/deleteworkout",workout,{headers: this.headers}).map(response => response.json()).catch(this.handleError)
    }

    public getAllTrainers(): Observable<User[]> {
        return this.http.get("http://localhost:9123/getalltrainers",{headers: this.headers}).map(response => response.json()).catch(this.handleError)
    }


}
