import { async, ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { DebugElement } from "@angular/core";
import { CoursesModule } from "../courses.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { CoursesService } from "../services/courses.service";

describe('HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let elem: DebugElement;
    let coursesService: CoursesService;

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
                coursesService = TestBed.get(CoursesService);
            })

    }));



    it('should create the component', () => {

        expect(component).toBeTruthy();


    });

    it('Should display only beginner courses', () => {

        pending()

    });
});
