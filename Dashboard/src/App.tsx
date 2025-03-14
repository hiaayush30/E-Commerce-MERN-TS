import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react';

import ErrorPage from './pages/ErrorPage';
import Loader from './components/Loader';
import Layout from './Layout';
import NewProduct from './pages/management/NewProduct';
import Product from './pages/management/Product';
import Transaction from './pages/management/Transaction';
const LineCharts = lazy(() => import('./pages/charts/LineCharts'));
const PieCharts = lazy(() => import('./pages/charts/PieCharts'));
const BarCharts = lazy(() => import('./pages/charts/BarCharts'));
const Dashboard = lazy(() => import('./pages/Dashboard')); //code splitting
const Customers = lazy(() => import('./pages/Customers'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Products = lazy(() => import('./pages/Products'));
const Toss = lazy(() => import('./pages/apps/Toss'));
const Stopwatch = lazy(() => import('./pages/apps/Stopwatch'));
const Coupon = lazy(() => import('./pages/apps/Coupon'));


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/admin/' element={<Layout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              {/* The replace prop in <Navigate /> controls how the navigation behaves in the browser's history. */}
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='products' element={<Products />} />
              <Route path='transactions' element={<Transactions />} />
              <Route path='customers' element={<Customers />} />
              <Route path='product/new' element={<NewProduct />} />
              <Route path='product/:id' element={<Product />} />
              <Route path='transaction/:id' element={<Transaction />} />
              <Route path='charts/'>
                <Route path='bar' element={<BarCharts />} />
                <Route path='pie' element={<PieCharts />} />
                <Route path='line' element={<LineCharts />} />
              </Route>
              <Route path='apps/'>
                <Route path='toss' element={<Toss />} />
                <Route path='stopwatch' element={<Stopwatch />} />
                <Route path='coupon' element={<Coupon />} />
              </Route>
            </Route>
            <Route path='*' element={<ErrorPage />} />
            {/* Charts */}
            {/* Other Apps */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
