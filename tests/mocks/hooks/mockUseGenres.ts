type Genre = { id: number; name: string };

export function mockUseGeneres(options: {
  loading?: boolean;
  error?: Error | null;
  data?: { genres: Genre[] } | null;
}) {
  vi.doMock("../../hooks/useGeneres", () => {
    return {
      default: () => ({
        isLoading: options.loading ?? false,
        error: options.error ?? null,
        data: options.data ?? null,
      }),
    };
  });
}
