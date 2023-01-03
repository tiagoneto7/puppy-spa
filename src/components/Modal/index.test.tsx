import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./index";
import { describe, it, expect, vi } from "vitest";

describe("Modal component tests", () => {
  const handleClose = vi.fn();

  beforeEach(() => {
    render(
      <Modal open={true} onClose={handleClose}>
        <div> child div </div>
      </Modal>
    );
  });

  it("modal renders", () => {
    const childDiv = screen.getByText("child div");
    expect(childDiv).toBeTruthy();
  });

  it("modal closes on blured div click", () => {
    const bluredDiv = screen.getByTestId("blur");
    fireEvent.click(bluredDiv);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("modal closes on esc key press", () => {
    const childDiv = screen.getByText("child div");
    expect(childDiv).toBeTruthy();

    fireEvent.keyDown(childDiv, {
      key: "Escape",
      code: "Escape",
      charCode: 27,
    });

    expect(handleClose).toHaveBeenCalledTimes(2);
  });
});
