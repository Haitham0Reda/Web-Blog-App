// Import necessary modules and styles
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Import custom components
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './userContext';
import CreateNewPost from './pages/CreateNewPost';
import SinglePost from './pages/SinglePost';
import EditPost from './pages/EditPost';

function App() {
  return (
    <UserContextProvider>
      {/*  Define the root routing using the 'Routes' and 'Route' components from 'react-router-dom' */}
      <Routes>
        {/* The '/' route will render the 'Layout' component */}
        <Route path='/' element={<Layout />}>
          {/* The 'index' route, when nested under '/', will render the 'IndexPage' component */}
          <Route index element={<IndexPage />} />

          {/* The '/login' route, when nested under '/', will render the 'LoginPage' component */}
          <Route path='/login' element={<LoginPage />} />

          {/* The '/register' route, when nested under '/', will render the 'RegisterPage' component */}
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreateNewPost />} />
          <Route path='/post/:id' element={<SinglePost />} />
          <Route path='/edit/:id' element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
