import { lazy, Suspense, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ProtectRoute } from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loader";
import axios from "axios";
import { Server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExited, userNotExited } from "./redux/reducers/auth";
import toast, { Toaster } from "react-hot-toast";
import {RootState} from "./redux/reducers/store"
import Contact from "./pages/Contact";
import LoginTest from "./pages/login1";
import LoanApplicationForm from "./components/LoanFrom";
import { Dashboard } from "./components/Dashboard";
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();



  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            element={
                <ProtectRoute user={user} />
            }
          >
            <Route path="/group" element={<Contact />} />
          

          </Route>
          <Route
            path="/login"
            element={
            <ProtectRoute user={!user} redirect="/">
                <LoginTest />
              </ProtectRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashborad" element={<Dashboard />} />
          <Route path="/login1" element={<LoginTest />} />
          <Route path="/loan/application" element={<LoanApplicationForm />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
