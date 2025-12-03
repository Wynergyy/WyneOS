export function report(data: any) {
  return {
    generatedAt: new Date().toISOString(),
    data,
    phase: 7
  };
}
