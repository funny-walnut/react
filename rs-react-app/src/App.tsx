import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';
import Home from './pages/Home';

function App() {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
}

export default App;
