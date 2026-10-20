
import { Money } from '../money/money.js';

export class Wallet {
  private balance: Money;

  constructor(initialBalance: Money) {
    if (initialBalance.toCents() < 0) {
      throw new Error('O saldo inicial não pode ser negativo.');
    }

    this.balance = initialBalance;
  }

  getBalance(): Money {
    return this.balance;
  }

  deposit(amount: Money): void {
    if (amount.toCents() <= 0) {
      throw new Error('O valor do depósito deve ser positivo.');
    }

    this.balance = this.balance.add(amount);
  }

  withdraw(amount: Money): void {
    if (amount.toCents() <= 0) {
      throw new Error('O valor do saque deve ser positivo.');
    }

    if (!this.balance.greaterThanOrEqual(amount)) {
      throw new Error('Saldo insuficiente.');
    }

    this.balance = this.balance.subtract(amount);
  }
}
