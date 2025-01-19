/**
 * ! Prototype
 * clonar objetos existentes sin depender de sus clases concretas. En lugar de construir
 * nuevos objetos desde cero, se puede copiar uno ya existente y modificarlo según sea necesario
 *
 * ? Propósito
 * Evitar la creación costosa de objetos desde cero
 * Reducir la dependencia del código en la clase concreta la usar instancias ya existentes.
 *
 * * Cuando usarlo
 * Cuando la creación de un objeto es costosa (por ejemplo, configuraciones complejas, cálculos intensivos).
 * Cuando necesitas muchos objetos similares, pero con pequeñas diferencias.
 * Para reducir el acoplamiento entre el cliente la clase del objeto
 *
 * ! UML
 * (1) Prototype --> define la interfaz para clonar objetos
 * (2) ConcretePrototype --> implementa la interfaz de clonación
 * (3) Client --> usa el prototype para clonar objetos en lugar de crear nuevos
 *
 * TODO: Supongamos que estamos desarrollando una plataforma donde los usuarios pueden configurar planes financieros.
 * TODO: Cada plan tiene configuraciones base (meta, duración, ahorro mensual, incentivos) y puede ser personalizado.
 * TODO: Usaremos el patrón Prototype para clonar un plan base y personalizarlo.
 *
 */

// Prototype Interface
interface FinancialPlan {
  clone(): FinancialPlan;
  displayDetails(): void;
}

// Concrete Prototype
class BasicFinancialPlan implements FinancialPlan {
  constructor(
    public goal: string,
    public duration: number,
    public monthlySavings: number,
    public incentives: string[],
    public initialSavings: number
  ) {}

  clone(): FinancialPlan {
    return new BasicFinancialPlan(
      this.goal,
      this.duration,
      this.monthlySavings,
      [...this.incentives],
      this.initialSavings
    );
  }
  displayDetails(): void {
    console.log(
      `
        Goal: ${this.goal}
        Duration: ${this.duration} months
        Monthly Savings: $${this.monthlySavings}
        Incentives: ${this.incentives.join(", ")}
        Initial Savings: $${this.initialSavings}
        `
    );
  }
}

class FinancialPlanFactory {
  private prototype: Map<string, FinancialPlan> = new Map();

  registerPlan(name: string, prototype: FinancialPlan): void {
    this.prototype.set(name, prototype);
  }

  createPlan(name: string): FinancialPlan {
    const prototype = this.prototype.get(name);
    if (!prototype) throw new Error(`Not prototype found for plan: ${name}`);
    return prototype.clone();
  }
}

// Client
function mainPrototype() {
  const planFactory = new FinancialPlanFactory();

  const savingsPlan = new BasicFinancialPlan("Save for a car", 24, 300, ["Cashback, Rewards Points"], 100);
  const investmentPlan = new BasicFinancialPlan(
    "Invest in stocks",
    36,
    500,
    ["Dividend reinvestment", "Reduced fees"],
    200
  );

  planFactory.registerPlan("Savings Plan", savingsPlan);
  planFactory.registerPlan("Investment Plan", investmentPlan);

  const clonedSavingsPlan = planFactory.createPlan("Savings Plan") as BasicFinancialPlan;
  clonedSavingsPlan.goal = "Save for a trip to Europe";
  clonedSavingsPlan.duration = 12;
  clonedSavingsPlan.monthlySavings = 400;

  console.log("\nCloned and Customized Savings Plan:");
  clonedSavingsPlan.displayDetails();

  const clonedInvestmentPlan = planFactory.createPlan("Investment Plan");
  console.log("\nCloned Investment Plan:");
  clonedInvestmentPlan.displayDetails();
}

mainPrototype();
