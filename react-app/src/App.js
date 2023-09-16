import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import { RestaurantDetail } from "./components/RestaurantDetail";
import { NewRestaurantForm } from "./components/NewRestaurantForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ManageRestaurants } from './components/ManageRestaurants'
import { ManageReservations } from "./components/ManageReservations";
import { ReservationForm } from "./components/ReservationForm";
import { Footer } from "./components/Footer";
import { ManageMenu } from "./components/ManageMenu";
import { CreateMenuForm } from "./components/CreateMenuForm";
import { Test } from "./components/Test";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/test'>
            <Test />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <ProtectedRoute path='/restaurants/new'>
            <NewRestaurantForm />
          </ProtectedRoute>
          <ProtectedRoute exact path='/restaurants/:restaurantId/menus'>
            <CreateMenuForm />
          </ProtectedRoute>
          <Route path='/restaurants/:restaurantId'>
            <RestaurantDetail />
          </Route>
          <ProtectedRoute exact path='/user/:userId/restaurants'>
            <ManageRestaurants />
          </ProtectedRoute>
          <ProtectedRoute exact path='/user/:userId/reservations'>
            <ManageReservations />
          </ProtectedRoute>
          <ProtectedRoute exact path='/user/:userId/menus'>
            <ManageMenu />
          </ProtectedRoute>
          <ProtectedRoute path='/user/:userId/restaurants/:restaurantId/reservations/new'>
            <ReservationForm />
          </ProtectedRoute>
        
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
