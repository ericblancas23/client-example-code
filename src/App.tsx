import "./App.css";

import { createBrowserRouter, Outlet } from "react-router-dom";

import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import AccessApproved from "./pages/access-approved";
import AccessDenied from "./pages/access-denied";
import AccessRequested from "./pages/access-requested";
import ForgotPasswordConfirmation from "./pages/forgot-password-confirmation";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import ResetPasswordConfirmation from "./pages/reset-password-confirmation";
import Profile from "./pages/profile/index";
import ChangePassword from "./pages/profile/change-password";
import ChangePasswordConfirmation from "./pages/profile/change-password-confirmation";
import Upload from "./pages/upload/index";
import JobNew from "./pages/jobs/new";
import JobConfirmation from "./pages/jobs/confirmation";
import Dashboard from "./pages/dashboard";
import CandidateNew from "./pages/candidates/new";
import CandidateConfirmation from "./pages/candidates/confirmation";
import { ProtectedRoute } from "./app/components/ProtectedRoute/ProtectedRoute";
import VerifyEmail from "./pages/verify-email";

const routes = [
  { path: "/", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/access-approved", element: <AccessApproved /> },
  { path: "/access-denied", element: <AccessDenied /> },
  { path: "/access-requested", element: <AccessRequested /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  {
    path: "/forgot-password-confirmation",
    element: <ForgotPasswordConfirmation />,
  },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    path: "/reset-password-confirmation",
    element: <ResetPasswordConfirmation />,
  },
  { path: "/verify-email", element: <VerifyEmail /> },
  {
    path: "/portal",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "upload", element: <Upload /> },
      { path: "candidates/new", element: <CandidateNew /> },
      {
        path: "candidates/:id/confirmation",
        element: <CandidateConfirmation />,
      },
      { path: "jobs/new", element: <JobNew /> },
      { path: "jobs/:id/confirmation", element: <JobConfirmation /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/change-password", element: <ChangePassword /> },
      {
        path: "profile/change-password-confirmation",
        element: <ChangePasswordConfirmation />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
