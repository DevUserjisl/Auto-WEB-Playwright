import { Ability } from './abilities/Ability';

export class Actor {
    private abilities: Map<string, Ability> = new Map();

    constructor(private name: string) {}

    static named(name: string): Actor {
        return new Actor(name);
    }

    whoCan(...abilities: Ability[]): Actor {
        for (const ability of abilities) {
            this.abilities.set(ability.constructor.name, ability);
        }
        return this;
    }

    abilityTo<T extends Ability>(abilityClass: new (...args: any[]) => T): T {
        const ability = this.abilities.get(abilityClass.name);
        if (!ability) {
            throw new Error(`${this.name} no tiene la habilidad ${abilityClass.name}`);
        }
        return ability as T;
    }

    async attemptsTo(...tasks: any[]): Promise<void> {
        for (const task of tasks) {
            await task.performAs(this);
        }
    }

    async asks<T>(question: any): Promise<T> {
        return question.answeredBy(this);
    }
}