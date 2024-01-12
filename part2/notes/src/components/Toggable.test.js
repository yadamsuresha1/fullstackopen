import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toggable from "./Toggable";

describe("<Toggable />", () => {
  let container;

  beforeEach(() => {
    container = render(
      <Toggable buttonLabel="show...">
        <div className="testDiv">Toggable content</div>
      </Toggable>
    ).container;
  });

  test("renders its children", async () => {
    await screen.findAllByText("Toggable content");
  });

  test("at start the children are not displayed", () => {
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });
  test("toggled content can be closed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const closeButton = screen.getByText("Cancel");
    await user.click(closeButton);

    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });
});
