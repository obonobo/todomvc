import { render } from "@testing-library/react";
import TodoMVC from "../../pages/index";

describe("App", () => {
  it("renders without crashing", () => {
    render(<TodoMVC />);
  });
});
