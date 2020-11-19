import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingController, ToastController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { ImageSnippet } from 'src/app/shared/image-snippet.model';
import { ToastControllerMock } from 'src/jest-mocks/toast-controller';
import { ImageServiceMock } from '../../../jest-mocks/image.service';
import { ImageService } from '../../services/image/image.service';
import { LoadingControllerMock } from './../../../jest-mocks/loading-controller';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let imageService: ImageService;
  let loadingCtrl: LoadingController;
  let toastCtrl: ToastController;

  const blob = new Blob([''], { type: 'image/png' });
  blob['name'] = 'mockFileName';

  const file = <File>blob;
  const event = {
    target: {
      result: 'mockFileSrc'
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        {
          provide: ImageService,
          useClass: ImageServiceMock
        },
        {
          provide: LoadingController,
          useClass: LoadingControllerMock
        },
        {
          provide: ToastController,
          useClass: ToastControllerMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    imageService = TestBed.inject(ImageService);
    loadingCtrl = TestBed.inject(LoadingController);
    toastCtrl = TestBed.inject(ToastController);
  }));

  test('Should sucessfully upload an image and call to read and upload the response', () => {
    jest.spyOn(component, 'readAndLoadUploadResponse').mockImplementation();
    component.uploadImage(event.target.result, file);
    expect(component.readAndLoadUploadResponse).toHaveBeenCalled();
  });

  test('Should call the handleError() method when upload fails', () => {
    jest.spyOn(imageService, 'uploadImage').mockReturnValue(throwError('error'));
    jest.spyOn(component, 'handleError').mockImplementation();

    component.uploadImage(event.target.result, file);

    expect(component.handleError).toHaveBeenCalled();
  });

  test('Should update the Original and Processed images', () => {
    const originalImage = new ImageSnippet('originalImage', <File>blob);
    const processedImage = new ImageSnippet('processedImage', <File>blob);

    component.updateOriginalAndProcessedImages(originalImage, processedImage);

    expect(component.originalImage).toEqual(originalImage);
    expect(component.processedImage).toEqual(processedImage);
  });
});
