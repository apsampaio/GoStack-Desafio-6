import { EntityRepository, Repository, getRepository } from 'typeorm';
import ReduceBalanceService from '../services/ReduceBalanceService';
import Balance from '../models/Balance';
import Transaction from '../models/Transaction';

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionRepository = getRepository(Transaction);
    const allTransactions = await transactionRepository.find();
    const reduceBalanceService = new ReduceBalanceService(allTransactions);
    const income = reduceBalanceService.execute('income');
    const outcome = reduceBalanceService.execute('outcome');
    const balance = new Balance({ income, outcome });
    return balance;
  }
}

export default TransactionsRepository;
