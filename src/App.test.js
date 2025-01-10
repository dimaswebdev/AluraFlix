import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the home page title", () => {
  render(<App />);
  const titleElement = screen.getByText(/recomendados para você/i); // Texto presente em `Home`
  expect(titleElement).toBeInTheDocument();
});
