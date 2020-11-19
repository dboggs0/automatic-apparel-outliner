export class LoadingControllerMock {
  create: () => any;
  dismiss: () => any;

  constructor() {
    this.create = jest.fn(() => Promise.resolve());
    this.dismiss = jest.fn(() => Promise.resolve());
  }
}
