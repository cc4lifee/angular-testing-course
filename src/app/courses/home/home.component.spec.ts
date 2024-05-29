import { async, ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { DebugElement } from "@angular/core";
import { CoursesModule } from "../courses.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { CoursesService } from "../services/courses.service";
import { setupCourses } from "../common/setup-test-data";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { click } from '../common/test-utils';

describe('HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let elem: DebugElement;
    let coursesService: any;

    const begginerCourses = setupCourses().filter(course => course.category == 'BEGINNER');
    const advancedCourses = setupCourses().filter(course => course.category == 'ADVANCED');

    beforeEach(waitForAsync(() => {

        const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

        TestBed.configureTestingModule({
            imports: [CoursesModule, NoopAnimationsModule],
            providers: [{ provide: CoursesService, useValue: coursesServiceSpy }]
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(HomeComponent);
                component = fixture.componentInstance;
                elem = fixture.debugElement;
                coursesService = TestBed.inject(CoursesService);
            })

    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('Should display only beginner courses', () => {

        coursesService.findAllCourses.and.returnValue(of(begginerCourses));

        fixture.detectChanges();

        const tabs = elem.queryAll(By.css(".mat-mdc-tab"));

        expect(tabs.length).toBe(1, "Unexpected number of tabs found")

    });

    it('Should display only advance courses', () => {

        coursesService.findAllCourses.and.returnValue(of(advancedCourses));

        fixture.detectChanges();

        const tabs = elem.queryAll(By.css(".mat-mdc-tab"));

        expect(tabs.length).toBe(1, "Unexpected number of tabs found")

    });

    it('Should display only advance courses', () => {

        coursesService.findAllCourses.and.returnValue(of(setupCourses()));

        fixture.detectChanges();

        const tabs = elem.queryAll(By.css(".mat-mdc-tab"));

        expect(tabs.length).toBe(2, "Unexpected number of tabs found")

    });

    it('Should display advance courses when tab clicked - fakeAsync', fakeAsync(() => {

        coursesService.findAllCourses.and.returnValue(of(setupCourses()));

        fixture.detectChanges();

        const tabs = elem.queryAll(By.css(".mat-mdc-tab"));

        click(tabs[1])

        fixture.detectChanges();

        flush();

        const cardTitles = elem.queryAll(By.css(".mat-mdc-tab-body-active .mat-mdc-card-title"));

        expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");

        expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

    }));

    it('Should display advance courses when tab clicked - waitForAsync', waitForAsync(() => {

        coursesService.findAllCourses.and.returnValue(of(setupCourses()));

        fixture.detectChanges();

        const tabs = elem.queryAll(By.css(".mat-mdc-tab"));

        click(tabs[1])

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            console.log('Called whenStable();');

            const cardTitles = elem.queryAll(By.css(".mat-mdc-tab-body-active .mat-mdc-card-title"));

            expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");

            expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");
        })


    }));
});
