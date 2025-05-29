export class ApiResponseDto<T> {
  constructor(
    private readonly message: string,
    private readonly data: T | null = null
  ) {}
}
