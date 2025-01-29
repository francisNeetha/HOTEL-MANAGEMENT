import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
  }),
}));

describe('index.tsx', () => {
  let originalGetElementById: typeof document.getElementById;

  beforeEach(() => {
    originalGetElementById = document.getElementById; 
  });

  afterEach(() => {
    document.getElementById = originalGetElementById; 
    jest.resetModules(); 
  });

  it('renders App component when root element exists', () => {
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    const mockCreateRoot = ReactDOM.createRoot as jest.Mock;
    const mockRoot = {
      render: jest.fn(),
    };
    mockCreateRoot.mockReturnValue(mockRoot);

    require('./index');

    expect(mockCreateRoot).toHaveBeenCalledWith(rootElement);
    expect(mockRoot.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    document.body.removeChild(rootElement);
  });

  it('throws an error if root element is not found', () => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      document.body.removeChild(rootElement);
    }

    expect(() => {
      require('./index');
    }).toThrow(
      "Root element not found. Make sure your index.html contains a div with id='root'."
    );
  });

  it('does not render App if document.getElementById is null', () => {
    document.getElementById = jest.fn().mockReturnValue(null);

    expect(() => {
      require('./index');
    }).toThrow(
      "Root element not found. Make sure your index.html contains a div with id='root'."
    );
  });
});
