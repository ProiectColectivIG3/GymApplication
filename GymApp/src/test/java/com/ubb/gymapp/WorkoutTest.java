package com.ubb.gymapp;

import com.ubb.gymapp.model.Workout;
import com.ubb.gymapp.model.Workout.Difficulty;
import com.ubb.gymapp.repository.WorkoutRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.hamcrest.CoreMatchers.hasItems;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WorkoutTest {

    @Autowired
    private WorkoutRepository workoutRepo;

    @Test
    public void testAdd() {
        Workout workout = new Workout("Swimming", Difficulty.HARD, "You will get wet!");
        workout = workoutRepo.save(workout);
        assertNotNull(workoutRepo.findOne(workout.getIdWorkout()));
        workoutRepo.delete(workout);
    }

    @Test
    public void testFindOne() {
        Workout workout = new Workout("Swimming", Difficulty.HARD, "You will get wet!");
        workout = workoutRepo.save(workout);
        Workout newWorkout = workoutRepo.findOne(workout.getIdWorkout());
        assertEquals(workout, newWorkout);
        workoutRepo.delete(workout);
    }

    @Test
    public void testDelete() {
        Workout workout = new Workout("Swimming", Difficulty.HARD, "You will get wet!");
        workout = workoutRepo.save(workout);
        workoutRepo.delete(workout);
        assertNull(workoutRepo.findOne(workout.getIdWorkout()));
    }

    @Test
    public void testFindAll() {
        Workout workout1 = new Workout("Swimming", Difficulty.HARD, "You will get wet!");
        Workout workout2 = new Workout("Yoga", Difficulty.EASY, "You will fall asleep!");
        Workout workout3 = new Workout("Tennis", Difficulty.MEDIUM, "You will scream like Sharapova!");
        workout1 = workoutRepo.save(workout1);
        workout2 = workoutRepo.save(workout2);
        workout3 = workoutRepo.save(workout3);
        List<Workout> dbWorkouts = workoutRepo.findAll();
        assertThat(dbWorkouts, hasItems(workout1, workout2, workout3));
        workoutRepo.delete(workout1);
        workoutRepo.delete(workout2);
        workoutRepo.delete(workout3);
    }

    @Test
    public void testUpdate() {
        Workout workout = new Workout("Swimming", Difficulty.HARD, "You will get wet!");
        workout = workoutRepo.save(workout);
        workout.setWorkoutType("newType");
        workout.setDescription("newDescription");
        workoutRepo.save(workout);
        Workout newWorkout = workoutRepo.findOne(workout.getIdWorkout());
        assertEquals(newWorkout.getWorkoutType(), "newType");
        assertEquals(newWorkout.getDifficulty(), Difficulty.HARD);
        assertEquals(newWorkout.getDescription(), "newDescription");
        workoutRepo.delete(workout);
    }
}

