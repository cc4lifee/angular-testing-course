import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { setupCourses } from '../common/setup-test-data';

import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from '../courses.module';

import { COURSES } from '../../../../server/db-data';
import { sortCoursesBySeqNo } from '../home/sort-course-by-seq';
import { Course } from '../model/course';


describe('CoursesCardListComponent', () => {

    let component: CoursesCardListComponent;

    let fixture: ComponentFixture<CoursesCardListComponent>;

    let elem: DebugElement;

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            imports: [CoursesModule]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(CoursesCardListComponent);
                component = fixture.componentInstance;
                elem = fixture.debugElement;
            })
    }));

    it("should create the component", () => {

        expect(component).toBeTruthy();

    });


    it("should display the course list", () => {

        component.courses = setupCourses();

        fixture.detectChanges();

        const cards = elem.queryAll(By.css('.course-card'));

        // console.log(cards);

        expect(cards).toBeTruthy('Could not find cards');

        expect(cards.length).toBe(12, 'Unexpected number of courses');


    });


    it("should display the first course", () => {

        component.courses = setupCourses();

        fixture.detectChanges();

        const course = component.courses[0];

        console.log(course);

        const card = elem.query(By.css('.course-card:first-child')),
            title = card.query(By.css('mat-card-title')),
            image = card.query(By.css('img'));

        expect(card).toBeTruthy('Could not find course card');
        expect(title.nativeElement.textContent).toBe(course.titles.description);
        expect(image.nativeElement.src).toBe(course.iconUrl)

    });


});

