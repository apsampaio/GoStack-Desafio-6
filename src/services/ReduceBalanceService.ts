import Transaction from '../models/Transaction';

class ReduceBalanceService {
  private transactions: Transaction[];

  constructor(transactions: Transaction[]) {
    this.transactions = transactions;
  }

  public execute(typeToReduce: 'income' | 'outcome'): number {
    const balanced = this.transactions.reduce(
      (accumulator: number, { type, value }: Transaction): number => {
        if (type === typeToReduce) return accumulator + value;
        return accumulator;
      },
      0,
    );

    return balanced;
  }
}

export default ReduceBalanceService;
