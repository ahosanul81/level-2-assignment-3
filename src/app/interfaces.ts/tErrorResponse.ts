export interface TErrorerrorSources {
  path: string;
  message: string;
}
export interface TErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errorSources: TErrorerrorSources[];
}
