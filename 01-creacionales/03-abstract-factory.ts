/**
 * ! Abstract Factory
 * permite producir familias de objetos relaciondos o dependientes sin especificar sus clases concretas.
 *
 * ? Propósito
 * Proveer una interfaz para crear familias de objetos relacionados
 * Garantizar que los objetos creados sean compatibles entre sí
 *
 * * Cuando usarlo
 * Cuando un sistema necesita trabajar con familias de productos relacionados (por ejemplo, una UI con diferentes temas: oscuro, claro)
 * Cuando quieres garantizar que las clases de un conjunto de objetos sean compatibles
 *
 * ! Diagrama UML
 * (1) AbstractFactory --> define la interfaz para crear familias de productos
 * (2) ConcreteFactory --> implementa la interfaz para crear productos concretos
 * (3) AbstractProduct --> define la interfaz de cada tipo de producto
 * (4) ConcreteProduct --> implementa la interfaz de producto específico
 *
 * TODO: imaginemos que queremos constuir un sistema financiero que tiene diferentes temas.
 * TODO: Cada tema define componentes visuales como gráficos y tablas.
 * TODO: Los productos relacionados deben ser compatibles entre sí
 *
 */

// Abstract Product Interfaces
interface Chart {
  render(): string;
}

interface Table {
  render(): string;
}

// Concrete Products: Dark theme
class DarkThemeChart implements Chart {
  render(): string {
    return "Rendering chart with dark theme";
  }
}

class DarkThemeTable implements Table {
  render(): string {
    return "Rendering table with dark theme";
  }
}

// Concrete Products: Light theme
class LightThemeChart implements Chart {
  render(): string {
    return "Rendering chart with light theme";
  }
}

class LightThemeTable implements Table {
  render(): string {
    return "Rendering table with light theme";
  }
}

class HighContrastThemeChart implements Chart {
  render(): string {
    return "Rendering chart with high contrast theme";
  }
}

class HighContrastThemeTable implements Table {
  render(): string {
    return "Rendering table with high contrast theme";
  }
}

// Abstract Factory Interface
interface ThemeFactory {
  createChart(): Chart;
  createTable(): Table;
}

// Concrete Factories
class DarkThemeFactory implements ThemeFactory {
  createChart(): Chart {
    return new DarkThemeChart();
  }
  createTable(): Table {
    return new DarkThemeTable();
  }
}

class LightThemeFactory implements ThemeFactory {
  createChart(): Chart {
    return new LightThemeChart();
  }
  createTable(): Table {
    return new LightThemeTable();
  }
}

class HighContrastThemeFactory implements ThemeFactory {
  createChart(): Chart {
    return new HighContrastThemeChart();
  }
  createTable(): Table {
    return new HighContrastThemeTable();
  }
}

// Client Code
class FinancialDashboard {
  private chart: Chart;
  private table: Table;

  constructor(factory: ThemeFactory) {
    this.chart = factory.createChart();
    this.table = factory.createTable();
  }

  render(): void {
    console.log(this.chart.render());
    console.log(this.table.render());
  }
}

function mainAbstractFactory() {
  console.log("Dark Theme");
  const darkThemeFactory = new DarkThemeFactory();
  const darkDashboard = new FinancialDashboard(darkThemeFactory);
  darkDashboard.render();

  console.log("\nLight Theme");
  const lightThemeFactory = new LightThemeFactory();
  const lightDashboard = new FinancialDashboard(lightThemeFactory);
  lightDashboard.render();

  console.log("\nHigh Contrast Theme");
  const highContrastThemeFactory = new HighContrastThemeFactory();
  const highContrastDashboard = new FinancialDashboard(highContrastThemeFactory);
  highContrastDashboard.render();
}

mainAbstractFactory();
