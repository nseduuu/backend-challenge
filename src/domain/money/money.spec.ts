import { describe, expect, it } from 'vitest';
import { Money } from './money.js';

describe('Money', () => {
    it('deve aceitar um valor inteiro seguro em centavos', () => {
        const money = Money.fromCents(750);

        expect(money).toBeInstanceOf(Money);
    });

    it('deve retornar o valor armazenado em centavos', () => {
        const money = Money.fromCents(750);

        expect(money.toCents()).toBe(750);
    });

    it('deve rejeitar valores que não sejam inteiros seguros', () => {
        expect(() => Money.fromCents(7.5)).toThrow();
    });

    it('deve rejeitar NaN', () => {
        expect(() => Money.fromCents(NaN)).toThrow();
    });

    it('representa infinito, não um valor finito utilizável como centavos', () => {
        expect(() => Money.fromCents(Infinity)).toThrow();
    });

    it('ultrapassa o maior inteiro seguro do JavaScript', () => {
        expect(() => Money.fromCents(Number.MAX_SAFE_INTEGER + 1)).toThrow();
    });

    it('deve somar dois valores monetários', () => {
        const primeiro = Money.fromCents(750);
        const segundo = Money.fromCents(250);

        const resultado = primeiro.add(segundo);

        expect(resultado.toCents()).toBe(1000);
        expect(primeiro.toCents()).toBe(750);
    })

    it('deve rejeitar uma soma que ultrapassa o limite seguro do JavaScript', () => {
        const primeiro = Money.fromCents(Number.MAX_SAFE_INTEGER);
        const segundo = Money.fromCents(1);

        expect(() => primeiro.add(segundo)).toThrow();
    });

    it('deve subtrair dois valores monetários', () => {
        const primeiro = Money.fromCents(750);
        const segundo = Money.fromCents(250);

        const resultado = primeiro.subtract(segundo);

        expect(resultado.toCents()).toBe(500);
        expect(primeiro.toCents()).toBe(750);
    });

    it('deve rejeitar uma subtracao que ultrapassa o limite seguro do JavaScript', () => {
        const primeiro = Money.fromCents(Number.MIN_SAFE_INTEGER);
        const segundo = Money.fromCents(1);

        expect(() => primeiro.subtract(segundo)).toThrow();
    });

    it('deve retornar true quando o primeiro valor for maior', () => {
        const primeiro = Money.fromCents(10000); // R$ 100,00
        const segundo = Money.fromCents(3500);   // R$ 35,00

        expect(primeiro.greaterThanOrEqual(segundo)).toBe(true);
    });

    it('deve retornar true quando o primeiro valor for igual', () => {
        const primeiro = Money.fromCents(10000); // R$ 100,00
        const segundo = Money.fromCents(10000);  // R$ 100,00

        expect(primeiro.greaterThanOrEqual(segundo)).toBe(true);
    });

    it('deve retornar false quando o primeiro valor for menor', () => {
        const primeiro = Money.fromCents(8000);  // R$ 80,00
        const segundo = Money.fromCents(10000);  // R$ 100,00

        expect(primeiro.greaterThanOrEqual(segundo)).toBe(false);
    });

    it('deve formatar 1050 centavos como "10.50"', () => {
        const money = Money.fromCents(1050);

        expect(money.toString()).toBe('10.50');
    });

    it('deve formatar 275 centavos como "2.75"', () => {
        const money = Money.fromCents(275);

        expect(money.toString()).toBe('2.75');
    });

    it('deve completar os centavos com zero à esquerda', () => {
        const money = Money.fromCents(5);

        expect(money.toString()).toBe('0.05');
    });

    it('deve formatar valores negativos corretamente', () => {
        expect(Money.fromCents(-250).toString()).toBe('-2.50');
    });

    it('deve formatar centavos negativos corretamente', () => {
        expect(Money.fromCents(-5).toString()).toBe('-0.05');
    });

    it('deve formatar zero corretamente', () => {
        expect(Money.fromCents(0).toString()).toBe('0.00');
    });
});