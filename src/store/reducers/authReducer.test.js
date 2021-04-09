import authReducer from "./authReducer";
import * as actionTypes from "../actions/actionTypes";

describe("authReducer", () => {
  it("should return the initial state", function () {
    expect(authReducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
    });
  });

  it("should store the token upon loggin in", function () {
    expect(
      authReducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
        },
        {
          type: actionTypes.AUTH_SUCCEEDED,
          authData: { idToken: "some token", localId: "some localId" },
        }
      )
    ).toEqual({
      token: "some token",
      userId: "some localId",
      error: null,
      loading: false,
    });
  });
});
