/**
 * ! Builder
 * Permite constuir objetos complejos paso a paso. Es útil cuando un objeto
 * tiene múltiples configuraciones posibles o necesita ser construido de forma incremental
 *
 * ? Propósito
 * Separar la construcción de un objeto complejo de su representación
 * Facilitar la creación de diferentes configuraciones del mismo objeto sin necesidad de alterar su código base
 *
 * * Cuando usarlo
 * Cuando el proceso de construcción es complejo (con múltiples paso o configuraciones)
 * Cuando querés constuir objetos de forma incremental
 * Cuando el código de creación de objetos se vuelve difícil de leer o manterner
 *
 * ! Diagrama UML
 * 1) Product --> El objeto complejo que se va a construir
 * 2) Builder --> Interfaz o clase abstracta que define los apsos para construir el objeto
 * 3) Concrete Builder --> Implemente los pasos definidos en el Builder
 * 4) Director --> OPCIONAL. Coordina el proceso de construcción utilizando un Builder
 *
 *  TODO: vamos a construir un simulador financiero que incluye: Meta, Plazo, Ahorro mensual sugerido, incentivo (cashback o ptos)
 *
 */

// Product
class FinancialSimulator {
  public goal: string = "";
  public duration: number = 0;
  public monthlySavings: number = 0;
  public incentives: string[] = [];
  public initialSavings: number = 0;
  public totalSavings: number = 0;

  public calculateProgress(): string {
    const progress = ((this.initialSavings / this.totalSavings) * 100).toFixed(2);
    return `Progress ${progress} of your goal completed`;
  }

  displayDetails(): void {
    console.log(`
        Goal: ${this.goal}
        Duration: ${this.duration}
        Monthly Savings: $${this.monthlySavings}
        Initial Savings: $${this.initialSavings}
        Total Savings: $${this.totalSavings}
        Incentives: ${this.incentives.join(", ")}
        Pregress: ${this.calculateProgress()}
    `);
  }
}

// Builder
interface FinancialSimulatorBuilder {
  setGoal(goal: string): this;
  setDuration(duration: number): this;
  calculateMonthlySavings(amount: number): this;
  addIncentives(incentives: string[]): this;
  setInitialSavings(initialSavings: number): this;
  setTotalGoal(totalSavings: number): this;
  build(): FinancialSimulator;
}

// Concrete Builder
class ConcreteFinancialSimulatorBuilder implements FinancialSimulatorBuilder {
  private simulator: FinancialSimulator;

  constructor() {
    this.simulator = new FinancialSimulator();
  }
  setInitialSavings(initialSavings: number): this {
    this.simulator.initialSavings = initialSavings;
    return this;
  }
  setTotalGoal(totalSavings: number): this {
    this.simulator.totalSavings = totalSavings;
    return this;
  }
  setGoal(goal: string): this {
    this.simulator.goal = goal;
    return this;
  }
  setDuration(duration: number): this {
    this.simulator.duration = duration;
    return this;
  }
  calculateMonthlySavings(amount: number): this {
    this.simulator.monthlySavings = amount / this.simulator.duration;
    return this;
  }
  addIncentives(incentives: string[]): this {
    this.simulator.incentives = incentives;
    return this;
  }
  build(): FinancialSimulator {
    return this.simulator;
  }
}

// Director
class SimulatorDirector {
  private builder: FinancialSimulatorBuilder;

  constructor(builder: FinancialSimulatorBuilder) {
    this.builder = builder;
  }

  builTravelSimulator(): FinancialSimulator {
    return this.builder
      .setGoal("Travel to Europe")
      .setDuration(12)
      .calculateMonthlySavings(5000)
      .setInitialSavings(1000)
      .setTotalGoal(6000)
      .addIncentives(["Cashback on flights", "Reward points"])
      .build();
  }

  buildHomeSimulator(): FinancialSimulator {
    return this.builder
      .setGoal("Buy a Home")
      .setDuration(24)
      .calculateMonthlySavings(50000)
      .setInitialSavings(10000)
      .setTotalGoal(60000)
      .addIncentives(["Discount on loans", "Free consultations"])
      .build();
  }
}

// Client
function main() {
  const builder = new ConcreteFinancialSimulatorBuilder();
  const director = new SimulatorDirector(builder);

  const travelSimulator = director.builTravelSimulator();
  travelSimulator.displayDetails();
  const homeSimulator = director.buildHomeSimulator();
  homeSimulator.displayDetails();
}

main();
