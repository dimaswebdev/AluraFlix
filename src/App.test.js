/* eslint-env jest */
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the home page title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Recomendado para você/i); // Atualize para o novo texto
  expect(titleElement).toBeInTheDocument();
});
