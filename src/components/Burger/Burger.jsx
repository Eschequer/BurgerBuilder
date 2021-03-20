import React from "react";
import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

function Burger(props) {
  let renderIngredients = Object.keys(props.ingredients)
    .map((ingredient) => {
      return [...Array(props.ingredients[ingredient])].map((_, index) => {
        return <BurgerIngredient type={ingredient} key={ingredient + index} />;
      });
    })
    .reduce((arr, elem) => arr.concat(elem), []);

  if (renderIngredients.length === 0)
    renderIngredients = "Start entering ingredients!";

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {renderIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default Burger;
