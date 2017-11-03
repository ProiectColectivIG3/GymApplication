package com.ubb.gymapp.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table (name = "workout")
public class Workout implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5485075350217272508L;
	private Long workoutId;
	private String workoutType;
	private Difficulties difficulty;
	private String description;
	private List<Timetable> timetables;

	public enum Difficulties {
		EASY, MEDIUM, HARD
	};
	
	public Workout() {
	
	}

	public Workout(Long workoutId, String workoutType, Difficulties difficulty, String description) {
		this.workoutId = workoutId;
		this.workoutType = workoutType;
		this.difficulty = difficulty;
		this.description = description;
	}

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column (name = "idWorkout", unique = true, nullable = false)
	public Long getWorkoutId() {
		return workoutId;
	}

	public void setWorkoutId(Long workoutId) {
		this.workoutId = workoutId;
	}

	@Column (name = "WorkoutType")
	public String getWorkoutType() {
		return workoutType;
	}

	public void setWorkoutType(String workoutType) {
		this.workoutType = workoutType;
	}

	@Column (name = "Difficulty")
	@Enumerated(EnumType.STRING)
	public Difficulties getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(Difficulties difficulty) {
		this.difficulty = difficulty;
	}

	@Column (name = "Desc")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@OneToMany(fetch = FetchType.LAZY,mappedBy="workout",cascade = CascadeType.PERSIST)
	public List<Timetable> getTimetables() {
		return timetables;
	}

	public void setTimetables(List<Timetable> timetables) {
		this.timetables = timetables;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((difficulty == null) ? 0 : difficulty.hashCode());
		result = prime * result + ((workoutId == null) ? 0 : workoutId.hashCode());
		result = prime * result + ((workoutType == null) ? 0 : workoutType.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Workout other = (Workout) obj;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (difficulty == null) {
			if (other.difficulty != null)
				return false;
		} else if (!difficulty.equals(other.difficulty))
			return false;
		if (workoutId == null) {
			if (other.workoutId != null)
				return false;
		} else if (!workoutId.equals(other.workoutId))
			return false;
		if (workoutType == null) {
			if (other.workoutType != null)
				return false;
		} else if (!workoutType.equals(other.workoutType))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Workout [workoutId=" + workoutId + ", workoutType=" + workoutType + ", difficulty=" + difficulty
				+ ", description=" + description + "]";
	}

	

}
