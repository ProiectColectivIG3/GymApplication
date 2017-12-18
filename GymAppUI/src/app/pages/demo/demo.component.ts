import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IStarRatingOnClickEvent } from 'angular-star-rating/src/star-rating-struct';
import * as moment from 'moment';


@Component( {
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
} )
export class DemoComponent implements OnInit {

    onClickResult: IStarRatingOnClickEvent;
    ratingVal = 3.5;
    events: any[];
    header: any;
    option: any;

    timeTableExamples = [
        {
            'timeTableName': 'Zumba',
            'start': 1513080000000,
            'duration': 60,
            'day': 'Montag',
            'trainer': 'Jane Doe',
            'intensity': 'medium'
        },
        {
            'timeTableName': 'Aerobic',
            'start': 1513087200000,
            'duration': 60,
            'day': 'Montag',
            'trainer': 'Jay Doe',
                'intensity': 'medium'
        },
        {
            'timeTableName': 'Tae Bo',
            'start': 1513080000000,
            'duration': 60,
            'day': 'Montag',
            'trainer': 'Jane Doe',
            'intensity': 'medium'
        },
        {
            'timeTableName': 'Tae Bo',
            'start': 1513080000000,
            'duration': 60,
            'day': 'Dienstag',
            'trainer': 'Cucu Bau',
            'intensity': 'medium'
        },
        {
            'timeTableName': 'Aerobic',
            'start': 1513087200000,
            'duration': 60,
            'day': 'Mittwoch',
            'trainer': 'Jane Doe',
            'intensity': 'medium'
        },
        {
            'timeTableName': 'Tae Bo',
            'start': 1513080000000,
            'duration': 60,
            'day': 'Mittwoch',
            'trainer': 'Jane Doe',
            'intensity': 'medium'
        },
        {
            'timeTableName': 'Zumba',
            'start': 1513080000000,
            'duration': 60,
            'day': 'Donnerstag',
            'trainer': 'Cucu Doe',
            'intensity': 'medium'
        },
        {
            'timeTableName': 'Aerobic',
            'start': 1513087200000,
            'duration': 60,
            'day': 'Donnerstag',
            'trainer': 'Cucu Doe',
            'intensity': 'medium'
        },
        {
            'timeTableName': 'Tae Bo',
            'start': 1513080000000,
            'duration': 60,
            'day': 'Donnerstag',
            'trainer': 'Cucu Doe',
            'intensity': 'medium'
        },
        {
            'timeTableName': 'Zumba',
            'start': 1513080000000,
            'duration': 60,
            'day': 'Freitag',
            'trainer': 'Cucu Doe',
            'intensity': 'medium'
        },
        {
            'timeTableName': 'Karate',
            'start': 1513080000000,
            'duration': 60,
            'day': 'Samstag',
            'trainer': 'Ion Ionel',
            'intensity': 'medium'
        },
        {
            'timeTableName': 'Karate',
            'start': 1513080000000,
            'duration': 60,
            'day': 'Sonntag',
            'trainer': 'Ion Ionel',
            'intensity': 'medium'
        }
    ];

    constructor() { }

    ngOnInit() {
        // get rating from db
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: ''
        };
        this.option = {
            firstDay: 1,
            slotLabelFormat: 'HH:mm',
            timeFormat: 'HH:mm'
        };
    }

    onClick = ( $event: IStarRatingOnClickEvent ) => {
        console.log( 'onClick $event: ', $event );
        this.onClickResult = $event;
        const rating = $event.rating;
        alert( rating );
        // save the rating in the db
    }
    loadEvents( event ) {
        const startDate = new Date( event.view.start._i );
        this.prepareEvents( startDate );
        console.log( 'Here we prepare the timetable for a certain week' );
    }
    handleEventClick( event ) {
        const startDate = new Date( event.view.start._i );
        console.log( 'I have been clicked!' );
    }

    prepareEvents( startWeek: Date ) {
        // scoatem orele extra
        startWeek = new Date( startWeek.getTime() - startWeek.getHours() * 60 * 60 * 1000 );
        this.events = [];
        for ( const timeTableExample of this.timeTableExamples ) {
            const event = {};
            // setam titlu
            event['title'] = timeTableExample.timeTableName;
            // calculam startul in functie de ziua definita (Montag, Dienstag etc) si data de inceput din calendar (care va fi mereu luni)
            let startDayMilliseconds = startWeek.getTime() + this.getDayIndex( timeTableExample.day ) * 24 * 60 * 60 * 1000;
            // setam acum ora si minutele din timetable
            const timeTableStart = new Date( timeTableExample.start );
            startDayMilliseconds += timeTableStart.getHours() * 60 * 60 * 1000 + timeTableStart.getMinutes() * 60 * 1000;
            const startDay = new Date( startDayMilliseconds );
            event['start'] = moment( startDay ).format( 'YYYY-MM-DD[T]HH:mm:ss' );
            // calculam end-ul ca start + duration
            const endDayMilliseconds = startDayMilliseconds + timeTableExample.duration * 60 * 1000;
            const endDay = new Date( endDayMilliseconds );
            event['end'] = moment( endDay ).format( 'YYYY-MM-DD[T]HH:mm:ss' );
            event['trainer'] = timeTableExample.trainer;
            event['intensity'] = timeTableExample.intensity;
            this.events.push( event );
        }
    }

    getDayIndex( day: string ) {
        switch ( day ) {
            case 'Montag':
                return 0;
            case 'Dienstag':
                return 1;
            case 'Mittwoch':
                return 2;
            case 'Donnerstag':
                return 3;
            case 'Freitag':
                return 4;
            case 'Samstag':
                return 5;
            case 'Sonntag':
                return 6;
        }
    }
    eventRender( event, element, view ) {
        console.log( event, element, view );
        debugger;
        element.find( '.fc-content .fc-title' ).html( event.title + '<br/>' + event.trainer );
        const data = event.start._d;
        // faceti verificarea daca data e in trecut
        console.log(event);
        if (event.intensity == 'medium') {
            element.addClass('intensity-medium');
        }
    }
}