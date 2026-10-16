import { createBrowserRouter } from 'react-router-dom';

import SiteLayout from '../components/layout/SiteLayout';
import DiscoverPage from '../pages/DiscoverPage';
import CountriesPage from '../pages/CountriesPage';
import CountryDetailsPage from '../pages/CountryDetailsPage';
import CitiesPage from '../pages/CitiesPage';
import CityDetailsPage from '../pages/CityDetailsPage';
import AttractionsPage from '../pages/AttractionsPage';
import AttractionDetailsPage from '../pages/AttractionDetailsPage';
import FavoritesPage from '../pages/FavoritesPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      {
        path: '/',
        element: <DiscoverPage />,
      },
      {
        path: '/countries',
        element: <CountriesPage />,
      },
      {
        path: '/countries/:countryId',
        element: <CountryDetailsPage />,
      },
      {
        path: '/cities',
        element: <CitiesPage />,
      },
      {
        path: '/cities/:cityId',
        element: <CityDetailsPage />,
      },
      {
        path: '/attractions',
        element: <AttractionsPage />,
      },
      {
        path: '/attractions/:attractionId',
        element: <AttractionDetailsPage />,
      },
      {
        path: '/favorites',
        element: <FavoritesPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
