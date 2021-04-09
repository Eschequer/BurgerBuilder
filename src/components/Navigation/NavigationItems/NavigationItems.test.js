import { configure, shallow } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems.WrappedComponent location="/" />);
  });

  it("should render 2 <NavigationItem /> elements if not authenticated", function () {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render 3 <NavigationItem /> elements if  authenticated", function () {
    wrapper.setProps({ isAuthenticated: true });

    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should render the exact logout button", function () {
    wrapper.setProps({ isAuthenticated: true });

    expect(
      wrapper.contains(
        <NavigationItem link="/logout" active={location.pathname === "/logout"}>
          Logout
        </NavigationItem>
      )
    ).toEqual(true);
  });
});
