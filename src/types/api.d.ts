export interface ApiResponseData<D> {
  data: D;
  message?: string;
  error?: string;
  statusCode?: number;
}
