export interface RequestOptions {
  headers?: Record<string, any>
  params?: Record<string, string>
  [key: string]: any
}

export interface HttpResponse<T> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
}

export interface HttpClient {
  get<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>>
  post<T>(url: string, body: any, options?: RequestOptions): Promise<HttpResponse<T>>
  put<T>(url: string, body: any, options?: RequestOptions): Promise<HttpResponse<T>>
  delete<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>>
}

export class RequestService {
  constructor(private readonly http: HttpClient) {}

  public async get<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>> {
    const { data, headers, status, statusText } = await this.http.get<T>(url, options)

    return {
      data,
      status,
      statusText,
      headers,
    }
  }

  public async post<T>(url: string, body: any, options?: RequestOptions): Promise<HttpResponse<T>> {
    const { data, headers, status, statusText } = await this.http.post<T>(url, body, options)

    return {
      data,
      status,
      statusText,
      headers,
    }
  }

  public async put<T>(url: string, body: any, options?: RequestOptions): Promise<HttpResponse<T>> {
    const { data, headers, status, statusText } = await this.http.put<T>(url, body, options)

    return {
      data,
      status,
      statusText,
      headers,
    }
  }

  public async delete<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>> {
    const { data, headers, status, statusText } = await this.http.delete<T>(url, options)

    return {
      data,
      status,
      statusText,
      headers,
    }
  }
}
