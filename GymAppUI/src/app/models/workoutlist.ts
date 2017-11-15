import {Subscription} from "./subscription";
import {Workout} from "./workout";

export class WorkoutList {
  subscription: Subscription;
  workouts: Workout[];

  constructor(subscription: Subscription, workouts: Workout[]) {
    this.subscription = subscription;
    this.workouts = workouts;
  }
}
