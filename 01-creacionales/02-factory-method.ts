/**
 * ! Factory Method:
 * proporciona una interfaz para crear objetos en una superclase, pero permite
 * a estas superclases alterar el tipo de objeto que se crean
 *
 * ? Propósito
 * encapsular la lógica de creación de objetos, delegandola a subclases
 * para que puedan decidir que clase especifica instanciar
 *
 * * Cuando usarlo
 * - Cuando no sabes de antemano que clase de objeto se necesita
 * - Cuando queres que las subclases controlen el proceso de creación
 * - Para adherirse al principio de inversión de dependencia (DIP)
 *
 * ! Diagrama UML
 * 1) Product --> define la interfaz de los objetos de la fábrica creacional
 * 2) ConcreteProduct --> implementar la interfaz de producto
 * 3) Creator --> declara el método de fábrica
 * 4) ConcreteCreator --> implementa el método de fábrica para crear instancias de productos específicos
 *
 * TODO: Supongamos un sistema para crear diferentes tipos de cuentas financieras: Ahorro e Invsersión
 */

// Product Interface
interface Account {
  getAccountType(): string;
  calculateInterest(): number;
  balance: number;
  currency: string;
  deposit(amount: number): void;
  withdraw(amount: number): boolean;
}

// Concrete Products
class SavingsAccount implements Account {
  balance: number = 0;
  currency: string = "USD";

  getAccountType(): string {
    return "Savings Account";
  }
  calculateInterest(): number {
    return 1.5;
  }
  deposit(amount: number): void {
    this.balance += amount;
  }
  withdraw(amount: number): boolean {
    if (this.balance >= amount) {
      this.balance -= amount;
      return true;
    }
    return false;
  }
}

class InvestmentAccount implements Account {
  balance: number = 0;
  currency: string = "USD";
  getAccountType(): string {
    return "Investment Account";
  }
  calculateInterest(): number {
    return 5;
  }
  deposit(amount: number): void {
    this.balance += amount;
  }
  withdraw(amount: number): boolean {
    if (this.balance >= amount) {
      this.balance -= amount;
      return true;
    }
    return false;
  }
}

class RetirementAccount implements Account {
  balance: number = 0;
  currency: string = "USD";
  getAccountType(): string {
    return "Retirement Account";
  }
  calculateInterest(): number {
    return 3;
  }
  deposit(amount: number): void {
    this.balance += amount;
  }
  withdraw(amount: number): boolean {
    if (this.balance >= amount) {
      this.balance -= amount;
      return true;
    }
    return false;
  }
}

// Creator abstract class
abstract class AccountCreator {
  abstract createAccount(): Account;

  public generateAccount(): string {
    const account = this.createAccount();
    return `Created a ${account.getAccountType()} with ${account.calculateInterest()}% interest rate and balance of ${account.balance} ${account.currency}.`;
  }
}

// Concrete Creators
class SavingsAccountCreator extends AccountCreator {
  override createAccount(): Account {
    const account = new SavingsAccount();
    account.balance = 1000;
    account.currency = "USD";
    account.deposit(2500)
    account.withdraw(3000)
    account.withdraw(500)
    return account;
  }
}

class InvestmentAccountCreator extends AccountCreator {
  override createAccount(): Account {
    return new InvestmentAccount();
  }
}

class RetirementAccountCreator extends AccountCreator {
  override createAccount(): Account {
    return new RetirementAccount();
  }
}

//Client Code
function mainFactoryMethod() {
  const savingsCreator = new SavingsAccountCreator();
  console.log(savingsCreator.generateAccount());

  const investmentCreator = new InvestmentAccountCreator();
  console.log(investmentCreator.generateAccount());

  const retirementCreator = new RetirementAccountCreator();
  console.log(retirementCreator.generateAccount());
}

mainFactoryMethod();
