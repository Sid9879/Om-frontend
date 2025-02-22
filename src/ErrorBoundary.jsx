import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to display the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to the console or an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h1>We are sorry, something went wrong.</h1>
          <p>Our team is working to resolve the issue.</p>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '10px 20px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Return Home
          </button>
        </div>
      );
    }

    return this.props.children; // Render the children components if no error
  }
}

export default ErrorBoundary;
