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
 * TODO: El sistema tiene múltiples componentes clave como cuentas financieras personalizadas, recomendaciones, simuladores y seguimiento.
 * TODO: Estos elementos varían según el usuario, sus metas, y otros factores.
 * TODO: Problema: Necesitamos generar recomendaciones personalizadas según el tipo de meta financiera (viajes, casa, auto, etc.).
 * TODO: Solución: Usar el Factory Method para crear diferentes tipos de recomendaciones basadas en la meta del usuario.
 */

// Product interface
interface Recommendation {
  getRecommendationDetails(): string;
}

// Concrete Products
class TravelRecommendation implements Recommendation {
  getRecommendationDetails(): string {
    return "Save $500 per month to achieve your travel goal.";
  }
}

class CarRecommendation implements Recommendation {
  getRecommendationDetails(): string {
    return "Save $300 per month or explore auto loan options.";
  }
}

class HomeRecommendation implements Recommendation {
  getRecommendationDetails(): string {
    return "Consider a mortgage plan for your $100,000 goal.";
  }
}

// Abstract Creator
abstract class RecommendationCreator {
  abstract createRecommendation(): Recommendation;

  public generateRecommendation(): string {
    const recommendation = this.createRecommendation();
    return recommendation.getRecommendationDetails();
  }
}

// Concrete Creators
class TravelRecommendationCreator extends RecommendationCreator {
  override createRecommendation(): Recommendation {
    return new TravelRecommendation();
  }
}

class CarRecommendationCreator extends RecommendationCreator {
  override createRecommendation(): Recommendation {
    return new CarRecommendation();
  }
}

class HomeRecommendationCreator extends RecommendationCreator {
  override createRecommendation(): Recommendation {
    return new HomeRecommendation();
  }
}

// Client
function generateUserRecommendation(goalType: string) {
  let creator: RecommendationCreator;

  switch (goalType) {
    case "travel":
      creator = new TravelRecommendationCreator();
      break;
    case "car":
      creator = new CarRecommendationCreator();
      break;
    case "home":
      creator = new HomeRecommendationCreator();
      break;
    default:
      throw new Error("Unknown goal type");
  }

  console.log(creator.generateRecommendation());
}

function main() {
  generateUserRecommendation("travel");
  generateUserRecommendation("car");
}

main();
