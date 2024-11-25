import { HomePage } from './../pages/Home';
import { Login } from './../pages/Login';
import CreateUser from './../pages/CreateUser';
import MovieDetail from './../pages/MovieDetail';
import AddMovie from './../pages/AddMovie';
import MoviesList from './../pages/MoviesList';
import UsersList from './../pages/UserList';
import UserDetail from './../pages/UserDetail';

export const routes = [
    { path: '/', element: <HomePage />, key: 'home' },
    { path: '/login', element: <Login />, key: 'login' },
    { path: '/add-user', element: <CreateUser />, key: 'add-user' },
    { path: '/movie-detail', element: <MovieDetail />, key: 'movie-detail' },
    { path: '/movie-list', element: <MoviesList />, key: 'movie-list' },
    { path: '/add-movie', element: <AddMovie />, key: 'add-movie' },
    { path: '/user-list', element: <UsersList />, key: 'user-list' },
    { path: '/user-detail', element: <UserDetail />, key: 'user-detail' },
  ];