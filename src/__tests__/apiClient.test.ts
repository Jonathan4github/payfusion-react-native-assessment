import { ApiError, apiFetch } from '../api/client';

describe('apiFetch', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('returns parsed JSON on success', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ hello: 'world' }),
      } as unknown as Response),
    ) as unknown as typeof fetch;

    const res = await apiFetch<{ hello: string }>('/test');
    expect(res).toEqual({ hello: 'world' });
  });

  it('throws ApiError on non-ok status', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Server Error',
      } as unknown as Response),
    ) as unknown as typeof fetch;

    await expect(apiFetch('/test')).rejects.toBeInstanceOf(ApiError);
    await expect(apiFetch('/test')).rejects.toMatchObject({ status: 500 });
  });

  it('wraps network errors in ApiError', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('offline'))) as unknown as typeof fetch;
    await expect(apiFetch('/test')).rejects.toBeInstanceOf(ApiError);
  });
});
