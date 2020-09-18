import tea_black from "../assets/img/tea_black.jpg";
import potato from "../assets/img/potato.jpg";
import chicken from "../assets/img/chicken.jpg";
import salad from "../assets/img/salad.jpg";
import oatmeal from "../assets/img/oatmeal.jpg";
import rice from "../assets/img/rice.jpg";
import pea_soup from "../assets/img/pea_soup.jpg";
import buckwheat from "../assets/img/buckwheat.png";
import oat_cookies from "../assets/img/oat_cookies.jpg";
import meatballs from "../assets/img/meatballs.jpg";
import coffee from "../assets/img/coffee.png";
import chocolate from "../assets/img/chocolate.png";

const dishes = {
  soup1: {
    id: "soup1",
    title: "Гороховый суп с копченостями",
    imgSrc: pea_soup,
    categoryId: "soups",
    schedule: [
      { name: "Пн", isActive: false },
      { name: "Вт", isActive: false },
      { name: "Ср", isActive: false },
      { name: "Чт", isActive: true },
      { name: "Пт", isActive: true },
      { name: "Сб", isActive: false },
      { name: "Вс", isActive: false },
    ],
    ingredients: [
      "Капуста",
      "Картошка",
      "Мясо",
      "Лук",
      "Морковь",
      "Томатная паста",
      "Соль",
    ],
    recipe:
      "1. Морковь очистить, нарезать мелкими кубиками.\n2. Разогреть 1 ст. ложку растительного масла, обжарить морковь на среднем огне до золотистого цвета (10 минут). Затем выложить морковь в миску.\n3. Лук очистить и мелко нарезать.\n4. На сковороде разогреть 0,5 ст. ложки растительного масла. Лук обжарить на среднем огне до прозрачности (5 минут). Для равномерного обжаривания лук нужно часто помешивать.\n5. Рис хорошенько промыть горячей водой.\n6. Картофель очистить и нарезать кубиками.\n7. Бульон с мясом довести до кипения. Мясо вынуть. Всыпать в бульон рис, довести до кипения. Затем выложить в суп лук и морковь, снова довести до кипения. После этого кинуть в суп картофель, накрыть суп крышкой и варить на медленном огне 15-20 минут (до готовности картофеля).\n8. Пока овощи и рис варятся, куриное филе нарезать поперек волокон на кубики.\n9. Когда картофель будет готов, мясо выложить в суп, размешать, довести до кипения. Зелень петрушки порвать и бросить в суп (можно и порезать).",
  },
  breakfast1: {
    id: "breakfast1",
    title: "Рисовая каша на молоке",
    imgSrc: rice,
    categoryId: "breakfast",
    schedule: [
      { name: "Пн", isActive: true },
      { name: "Вт", isActive: true },
      { name: "Ср", isActive: false },
      { name: "Чт", isActive: false },
      { name: "Пт", isActive: true },
      { name: "Сб", isActive: false },
      { name: "Вс", isActive: false },
    ],
    ingredients: ["Рис", "Молоко", "Соль"],
    recipe: "Сварить кашу",
  },
  breakfast2: {
    id: "breakfast2",
    title: "Овсяная каша на молоке",
    imgSrc: oatmeal,
    categoryId: "breakfast",
    schedule: [
      { name: "Пн", isActive: true },
      { name: "Вт", isActive: true },
      { name: "Ср", isActive: false },
      { name: "Чт", isActive: false },
      { name: "Пт", isActive: true },
      { name: "Сб", isActive: false },
      { name: "Вс", isActive: false },
    ],
    ingredients: ["Рис", "Молоко", "Соль"],
    recipe: "Сварить кашу",
  },
  side1: {
    id: "side1",
    title: "Гречка",
    imgSrc: buckwheat,
    categoryId: "sides",
    schedule: [
      { name: "Пн", isActive: true },
      { name: "Вт", isActive: true },
      { name: "Ср", isActive: false },
      { name: "Чт", isActive: false },
      { name: "Пт", isActive: true },
      { name: "Сб", isActive: false },
      { name: "Вс", isActive: false },
    ],
    ingredients: ["Чай", "Лимон"],
    recipe: "Заварить чаечек",
  },
  side2: {
    id: "side2",
    title: "Тушеная картошка с капустой",
    imgSrc: potato,
    categoryId: "sides",
    schedule: [
      { name: "Пн", isActive: true },
      { name: "Вт", isActive: true },
      { name: "Ср", isActive: false },
      { name: "Чт", isActive: false },
      { name: "Пт", isActive: true },
      { name: "Сб", isActive: false },
      { name: "Вс", isActive: false },
    ],
    ingredients: ["Чай", "Лимон"],
    recipe: "Заварить чаечек",
  },
  meat1: {
    id: "meat1",
    title: "Куриная грудка на гриле",
    imgSrc: chicken,
    categoryId: "meat",
    schedule: [
      { name: "Пн", isActive: true },
      { name: "Вт", isActive: true },
      { name: "Ср", isActive: false },
      { name: "Чт", isActive: false },
      { name: "Пт", isActive: true },
      { name: "Сб", isActive: false },
      { name: "Вс", isActive: false },
    ],
    ingredients: ["Чай", "Лимон"],
    recipe: "Заварить чаечек",
  },
  meat2: {
    id: "meat2",
    title: "Тефтели",
    imgSrc: meatballs,
    categoryId: "meat",
    schedule: [
      { name: "Пн", isActive: true },
      { name: "Вт", isActive: true },
      { name: "Ср", isActive: false },
      { name: "Чт", isActive: false },
      { name: "Пт", isActive: true },
      { name: "Сб", isActive: false },
      { name: "Вс", isActive: false },
    ],
    ingredients: ["Чай", "Лимон"],
    recipe: "Заварить чаечек",
  },
  salad1: {
    id: "salad1",
    title: "Овощной салат из помидоров и огурцов",
    imgSrc: salad,
    categoryId: "salad",
    schedule: [
      { name: "Пн", isActive: true },
      { name: "Вт", isActive: true },
      { name: "Ср", isActive: false },
      { name: "Чт", isActive: false },
      { name: "Пт", isActive: true },
      { name: "Сб", isActive: false },
      { name: "Вс", isActive: false },
    ],
    ingredients: ["Чай", "Лимон"],
    recipe: "Заварить чаечек",
  },
  desert1: {
    id: "desert1",
    title: "Овсяное печенье",
    imgSrc: oat_cookies,
    categoryId: "desert",
    schedule: [
      { name: "Пн", isActive: true },
      { name: "Вт", isActive: true },
      { name: "Ср", isActive: false },
      { name: "Чт", isActive: false },
      { name: "Пт", isActive: true },
      { name: "Сб", isActive: false },
      { name: "Вс", isActive: false },
    ],
    ingredients: ["Чай", "Лимон"],
    recipe: "Заварить чаечек",
  },
  desert2: {
    id: "desert2",
    title: "Шоколад",
    imgSrc: chocolate,
    categoryId: "desert",
    schedule: [
      { name: "Пн", isActive: true },
      { name: "Вт", isActive: true },
      { name: "Ср", isActive: false },
      { name: "Чт", isActive: false },
      { name: "Пт", isActive: true },
      { name: "Сб", isActive: false },
      { name: "Вс", isActive: false },
    ],
    ingredients: ["Чай", "Лимон"],
    recipe: "Заварить чаечек",
  },
  drink1: {
    id: "drink1",
    title: "Чай черный с лимоном",
    imgSrc: tea_black,
    categoryId: "drinks",
    schedule: [
      { name: "Пн", isActive: true },
      { name: "Вт", isActive: true },
      { name: "Ср", isActive: false },
      { name: "Чт", isActive: false },
      { name: "Пт", isActive: true },
      { name: "Сб", isActive: false },
      { name: "Вс", isActive: false },
    ],
    ingredients: ["Чай", "Лимон"],
    recipe: "Заварить чаечек",
  },
  drink2: {
    id: "drink2",
    title: "Кофе латте",
    imgSrc: coffee,
    categoryId: "drinks",
    schedule: [
      { name: "Пн", isActive: true },
      { name: "Вт", isActive: true },
      { name: "Ср", isActive: false },
      { name: "Чт", isActive: false },
      { name: "Пт", isActive: true },
      { name: "Сб", isActive: false },
      { name: "Вс", isActive: false },
    ],
    ingredients: ["Кофе", "Молоко"],
    recipe: "Заварить чаечек",
  },
};

export default dishes;
