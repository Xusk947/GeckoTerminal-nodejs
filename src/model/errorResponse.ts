export interface GeckoTerminalErrorsResponse {
  errors: Error[];
}

export class GeckoTerminalError {
  status: string;
  title: string;

  constructor(response: Response) {
    this.status = response.status.toString();
    this.title = response.statusText.toString();
  }
}
