import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import Footer from "../../src/app/components/Footer"
import React from 'react';

describe('Footer', () => {
  it('should render alink to the home page', async () => {
    render(<Footer />);
    const linkElement = screen.getByText('conduit')
    expect(linkElement).toBeInTheDocument()
    
  });
});
