export const formattedAmountDeposit = (
  { deposit_amount }: { deposit_amount: number }
): string => {
  return deposit_amount.toLocaleString("es-AR");
};
