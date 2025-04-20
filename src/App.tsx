
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BusinessDetails from "./pages/BusinessDetails";
import Bookings from "./pages/Bookings";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import Login from "./pages/Auth/Customer/Login";
import Register from "./pages/Auth/Customer/Register";
import BusinessLogin from "./pages/Auth/Business/Login";
import BusinessRegister from "./pages/Auth/Business/Register";
import BusinessDashboard from "./pages/Business/Dashboard";
import AdminDashboard from "./pages/Admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Customer routes */}
          <Route path="/" element={<Index />} />
          <Route path="/customer/login" element={<Login />} />
          <Route path="/customer/register" element={<Register />} />
          <Route path="/business/:id" element={<BusinessDetails />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/notifications" element={<Notifications />} />
          
          {/* Business routes */}
          <Route path="/business/login" element={<BusinessLogin />} />
          <Route path="/business/register" element={<BusinessRegister />} />
          <Route path="/business/dashboard" element={<BusinessDashboard />} />
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
