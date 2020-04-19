import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const reducer = (acumulator: number, currentValue: Transaction): number =>
      acumulator + currentValue.value;

    const incomeTransctions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const income = incomeTransctions.reduce(reducer, 0);

    const outcomeTransctions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const outcome = outcomeTransctions.reduce(reducer, 0);

    const total = income - outcome;

    const balance = {
      income: income || 0,
      outcome: outcome || 0,
      total: total || 0,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
