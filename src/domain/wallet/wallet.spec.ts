
import { describe, expect, it } from 'vitest';
import { Money } from '../money/money.js';
import { Wallet } from './wallet.js';

describe('Wallet', () => {
  it('deve iniciar com o saldo informado', () => {
    const wallet = new Wallet(Money.fromCents(10000));

    expect(wallet.getBalance().toCents()).toBe(10000);
  });

  it('não deve permitir saldo inicial negativo', () => {
    expect(() => new Wallet(Money.fromCents(-100))).toThrow(
      'O saldo inicial não pode ser negativo.',
    );
  });

  it('deve depositar dinheiro', () => {
    const wallet = new Wallet(Money.fromCents(10000));

    wallet.deposit(Money.fromCents(2500));

    expect(wallet.getBalance().toCents()).toBe(12500);
  });

  it('deve sacar dinheiro quando houver saldo suficiente', () => {
    const wallet = new Wallet(Money.fromCents(10000));

    wallet.withdraw(Money.fromCents(3000));

    expect(wallet.getBalance().toCents()).toBe(7000);
  });

  it('não deve permitir saque acima do saldo', () => {
    const wallet = new Wallet(Money.fromCents(5000));

    expect(() => wallet.withdraw(Money.fromCents(6000))).toThrow(
      'Saldo insuficiente.',
    );

    expect(wallet.getBalance().toCents()).toBe(5000);
  });

  it('não deve permitir depósito de zero', () => {
    const wallet = new Wallet(Money.fromCents(5000));

    expect(() => wallet.deposit(Money.fromCents(0))).toThrow(
      'O valor do depósito deve ser positivo.',
    );
  });

  it('não deve permitir saque de zero', () => {
    const wallet = new Wallet(Money.fromCents(5000));

    expect(() => wallet.withdraw(Money.fromCents(0))).toThrow(
      'O valor do saque deve ser positivo.',
    );
  });
});
