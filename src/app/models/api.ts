export interface HttpResponse<Response> {
  errors: errors;
  get: string;
  paging: Paging;
  parameters: Parameters;
  response: Response;
  results: number;
}

interface Paging {
  current: number;
  total: number;
}

interface errors {
  [key: string]: string;
}

interface Parameters {
  [key: string]: string;
}
