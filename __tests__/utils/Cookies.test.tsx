import { setCookie, getCookie } from "../../src/app/utils/cookies"

// Mock the cookies() function from 'next/headers'
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

// Mock Date.now() to a fixed value for the test
const fixedDateNow = 1609459200000; // Assuming it's January 1, 2023
global.Date.now = jest.fn(() => fixedDateNow);

test('setCookie sets a cookie with the correct options', () => {
  // Mock the cookie store and set method
  const mockSetMethod = jest.fn();
  const mockCookieStore = {
    set: mockSetMethod,
  };

  // Set up the mock for cookies()
  require('next/headers').cookies.mockReturnValue(mockCookieStore);

  // Call the setCookie function
  const cookieName = 'token';
  const cookieValue = 'exampleValue';
  setCookie(cookieName, cookieValue);

  // Assertions
  expect(require('next/headers').cookies).toHaveBeenCalled();
  expect(mockSetMethod).toHaveBeenCalledWith({
    name: cookieName,
    value: cookieValue,
    expires: fixedDateNow + 24 * 60 * 60 * 1000, // 1 day later
    httpOnly: true,
    path: '/',
  });
});

test('getCookie returns the correct value for a given cookie name', () => {
  // Mock the cookie store and get method
  const mockGetMethod = jest.fn().mockReturnValue({ value: 'mockCookieValue' });
  const mockCookieStore = {
    get: mockGetMethod,
  };

  // Set up the mock for cookies()
  require('next/headers').cookies.mockReturnValue(mockCookieStore);

  // Call the getCookie function
  const cookieName = 'exampleCookie';
  const result = getCookie(cookieName);

  // Assertions
  expect(require('next/headers').cookies).toHaveBeenCalled();
  expect(mockGetMethod).toHaveBeenCalledWith(cookieName);
  expect(result).toBe('mockCookieValue');
});