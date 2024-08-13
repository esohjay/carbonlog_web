export const formatText = (text: string) => {
  let formatedText = "";
  switch (text) {
    case "shoesAndFootwear":
      formatedText = "Shoes and footwears";
      break;
    case "salonAndGrooming":
      formatedText = "Salon and grooming";
      break;
    case "jewelleryAndWatch":
      formatedText = "Jewellery and watch";
      break;
    case "pharmaceuticalProducts":
      formatedText = "Pharmaceutical products";
      break;
    case "garden":
      formatedText = "Garden, plants and flowers";
      break;
    case "petFood":
      formatedText = "Pets food";
      break;
    case "medicalServices":
      formatedText = "Medical services";
      break;
    case "sportAndRecreationEquipment":
      formatedText = "Sport and recreational equipments";
      break;
    case "gamesOrToyOrHobbies":
      formatedText = "Games and toys";
      break;
    case "waterSupply":
      formatedText = "Water supply";
      break;
    case "refuseCollection":
      formatedText = "Refuse collection";
      break;
    case "householdAppliances":
      formatedText = "Household appliances";
      break;
    case "householdTextiles":
      formatedText = "Household textiles";
      break;
    case "householdUtensils":
      formatedText = "Utensils, Glass & Tablewares";
      break;
    case "breadAndCereals":
      formatedText = "Bread or Cereals";
      break;
    case "fishAndSeafood":
      formatedText = "Fish and seafood";
      break;
    case "oilAndFat":
      formatedText = "Oil and fat";
      break;
    case "milkCheeseEgg":
      formatedText = "Milk, cheese and egg";
      break;
    case "coffeeAndTea":
      formatedText = "Coffee and tea";
      break;
    case "waterAndJuice":
      formatedText = "Water and juice";
      break;
    case "clothingMaterials":
      formatedText = "Clothing";
      break;
    default:
      formatedText = text;
  }
  return formatedText;
};
