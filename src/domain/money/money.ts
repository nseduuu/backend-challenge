import { concat } from "rxjs";

export class Money {
    private constructor(
        private readonly cents: number,
    ) { }

    static fromCents(cents: number): Money {
        if (!Number.isSafeInteger(cents)) {
            throw new Error('O valor em centavos deve ser um inteiro seguro.');
        }

        return new Money(cents);
    }

    toCents(): number {
        return this.cents;
    }

    add(other: Money): Money {
        const soma = this.cents + other.toCents();

        if (!Number.isSafeInteger(soma)) {
            throw new Error('A soma ultrapassa o limite seguro de inteiros.');
        }

        return Money.fromCents(soma);
    }

    subtract(other: Money): Money {
        const subtracao = this.cents - other.toCents();

        if (!Number.isSafeInteger(subtracao)) {
            throw new Error('A subtração ultrapassa o limite seguro de inteiros.');
        }

        return Money.fromCents(subtracao);
    }

    greaterThanOrEqual(other: Money): boolean {
        // const valor1 = this.cents;
        // const valor2 = other.toCents();

        // if(valor1 >= valor2){
        //    return true
        // }
        // else{
        //     return false
        // }
        return this.cents >= other.toCents();

    }
    toString(): string {

        const valorAbsoluto = Math.abs(this.cents);
        const reais = Math.floor(valorAbsoluto / 100);
        const centavos = valorAbsoluto % 100;
        const sinal = this.cents < 0 ? '-' : '';
        const centavosFormatados = String(centavos).padStart(2, '0');

        return `${sinal}${reais}.${centavosFormatados}`;
    }
}
