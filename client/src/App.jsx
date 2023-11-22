import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./BookingsPage";
import BookingPage from "./pages/BookingPage";
import AdminPage from "./pages/AdminPage";
import UserFormPage from "./pages/UserFormPage";
import AdminBookingPage from "./pages/AdminBookingPage";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/bookings" element={<AdminPage />} />
          <Route path="/admin/places" element={<AdminPage />} />
          <Route path="/admin/user/:id" element={<UserFormPage />} />
          <Route path="/admin/places/new" element={<PlacesFormPage />} />
          <Route path="/admin/places/:id" element={<PlacesFormPage />} />
          <Route path="/admin/bookings/:id" element={<AdminBookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
