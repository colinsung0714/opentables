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
import {ManageRestaurants} from './components/ManageRestaurants'
import { ManageReservations } from "./components/ManageReservations";
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
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <ProtectedRoute path='/restaurants/new'>
            <NewRestaurantForm />
          </ProtectedRoute>
          <Route path='/restaurants/:restaurantId'>
            <RestaurantDetail />
          </Route>
          <ProtectedRoute path='/user/:userId/restaurants'>
            <ManageRestaurants />
          </ProtectedRoute>
          <ProtectedRoute path='/user/:userId/reservations'>
            <ManageReservations />
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
