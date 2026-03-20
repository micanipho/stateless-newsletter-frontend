import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewsletterDetailPage from './pages/NewsletterDetailPage';
import SubscribePage from './pages/SubscribePage';
import SubscriptionSuccessPage from './pages/SubscriptionSuccessPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4 max-w-4xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/newsletter/:id" element={<NewsletterDetailPage />} />
          <Route path="/subscribe" element={<SubscribePage />} />
          <Route path="/success" element={<SubscriptionSuccessPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;