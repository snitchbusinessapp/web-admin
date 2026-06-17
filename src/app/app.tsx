import Login from "components/pages/login";
import Dashboard from "components/pages/dashboard";
import BusinessProfile from "components/pages/business-profile";
import Workshops from "components/pages/workshops";
import AppLayout from "components/organisms/layout/app-layout";
import { useEffect, useRef, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useStore } from "../store";
import type { User } from "../store/slices/userSlice";

type AuthTransitionPhase = "idle" | "card-exiting" | "home-entering";

const OVERLAY_IN_MS = 220;
const HOME_ENTER_MS = 350;

function AuthenticatedApp() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/business-profile" element={<BusinessProfile />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

function App() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();
  const [phase, setPhase] = useState<AuthTransitionPhase>("idle");
  const pendingUser = useRef<User | null>(null);

  const handleLoginSuccess = (userData: User) => {
    pendingUser.current = userData;
    setPhase("card-exiting");
  };

  useEffect(() => {
    if (phase === "card-exiting") {
      const id = window.setTimeout(() => {
        if (pendingUser.current) {
          setUser(pendingUser.current);
          pendingUser.current = null;
        }
        navigate("/dashboard");
        setPhase("home-entering");
      }, OVERLAY_IN_MS);
      return () => window.clearTimeout(id);
    }

    if (phase === "home-entering") {
      const id = window.setTimeout(() => setPhase("idle"), HOME_ENTER_MS);
      return () => window.clearTimeout(id);
    }
  }, [phase, setUser, navigate]);

  const showOverlay = phase === "card-exiting" || phase === "home-entering";

  return (
    <div className="relative h-full w-full overflow-hidden">
      {user ? (
        <div
          className={`h-full w-full${phase === "home-entering" ? " animate-fade-in-up" : ""}`}
        >
          <AuthenticatedApp />
        </div>
      ) : (
        <Login
          onSuccess={handleLoginSuccess}
          isExiting={phase === "card-exiting"}
        />
      )}
      {showOverlay && (
        <div
          aria-hidden
          className={`fixed inset-0 z-50 bg-surface-container-subtle pointer-events-none ${
            phase === "card-exiting"
              ? "animate-login-overlay-in"
              : "animate-login-overlay-out"
          }`}
        />
      )}
    </div>
  );
}

export default App;
