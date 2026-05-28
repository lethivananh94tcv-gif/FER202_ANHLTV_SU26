import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppNavbar from './components/AppNavbar';
import RegistrationForm from './components/RegistrationForm';
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>

      {/* Navbar luôn hiển thị */}
      <AppNavbar />

      {/* Routes */}
      <Routes>
  <Route path="/" element={<RegistrationForm />} />

  <Route path="/home" element={<Home />} />

  <Route path="/posts" element={<PostList />} />

  <Route path="/posts/:id" element={<PostDetail />} />

  <Route path="/about" element={<About />} />

  <Route path="*" element={<NotFound />} />
</Routes>

    </BrowserRouter>
  );
}

export default App;