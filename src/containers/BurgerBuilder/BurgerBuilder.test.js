import { configure, shallow } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/BuildControls/BuildControls";

describe("<BurgerBuilder />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder fetchIngredients={() => {}} />);
  });

  it("should render <BuildControls /> when ingredients are received", function () {
    wrapper.setProps({ ingredients: { salad: 3, cheese: 1 } });

    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
