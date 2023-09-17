import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './login';

describe('Login Component', () => {
  it('renders the login form', () => {
    const { getByTestId } = render(<Login onLogin={jest.fn()} />);
    const loginContainer = getByTestId('login-container');
    expect(loginContainer).toBeInTheDocument();
  });

  it('handles user input and submits the form', async () => {
    // Mock a successful API response
    const mockSuccessResponse = { token: 'mock-token' };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => mockJsonPromise,
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    // Mock a callback function for successful login
    const mockOnLoginSuccess = jest.fn();

    const { getByTestId } = render(<Login onLogin={mockOnLoginSuccess} />);
    const emailInput = getByTestId('email-input') as HTMLInputElement;
    const passwordInput = getByTestId('password-input') as HTMLInputElement;
    const submitButton = getByTestId('submit-button');

    // Use act to ensure the form submission is processed in the same event loop
    await act(async () => {
      // Use user-event to simulate user input
      userEvent.type(emailInput, 'user@example.com');
      userEvent.type(passwordInput, 'password123');

      userEvent.click(submitButton);
    });

    // Expect the mock fetch function to have been called with the correct data
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3500/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'password123',
      }),
    });

    // Expect the onLoginSuccess callback to have been called with the token
    expect(mockOnLoginSuccess).toHaveBeenCalledWith('mock-token');
  });
});
