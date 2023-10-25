export interface ApiResponse<Response> {
  errors: Errors;
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

interface Errors {
  [key: string]: string;
}

interface Parameters {
  [key: string]: string;
}
