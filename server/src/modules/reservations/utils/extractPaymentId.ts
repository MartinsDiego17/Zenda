export function extractPaymentId(body: any): string | null {
  if (body?.data?.id) {
    return body.data.id;
  }

  if (body?.topic === 'payment' && typeof body.resource === 'string') {
    return null;
  }

  return null;
}
