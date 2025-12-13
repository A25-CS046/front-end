import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/authService";
import { useTheme } from "@/hooks/useTheme";
import { AlertCircle, Activity, Bot } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function Login({ onLogin }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { user, token } = await login(email, password);
      localStorage.setItem("authToken", token);
      if (onLogin) {
        onLogin(user); // Pass user data to onLogin handler
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
      console.error("Login Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
              <img
                src={
                  theme === "light"
                    ? "/images/logo-light.png"
                    : "/images/logo-dark.png"
                }
                alt="AEGIS Logo"
                className="w-12 h-12"
              />
            </div>
            <div>
              <h1 className="text-blue-600 dark:text-emerald-400">AEGIS</h1>
              <p className="text-slate-600 dark:text-slate-400">
                Predictive Maintenance Copilot
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-slate-900 dark:text-slate-100">
              AI-Powered Maintenance Intelligence
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Harness the power of machine learning to predict equipment
              failures, optimize maintenance schedules, and maximize operational
              efficiency.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-slate-100 mb-1">
                  Real-Time Monitoring
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Track machine health with live sensor data and instant anomaly
                  detection
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-slate-100 mb-1">
                  AI Copilot Assistant
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Get intelligent insights and recommendations powered by
                  machine learning
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-slate-100 mb-1">
                  Predictive Analytics
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Anticipate failures before they happen with advanced RUL
                  predictions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-slate-900 dark:text-slate-100 mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-slate-700 dark:text-slate-300"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@aegis.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-slate-700 dark:text-slate-300"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                  Or try demo access
                </span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Demo Credentials:
              </p>
              <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-mono">
                <p>Supervisor: supervisor@aegis.com / supervisor123</p>
                <p>Technician: tech@aegis.com / tech123</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Mobile Branding */}
        <div className="lg:hidden text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <img
                src={
                  theme === "light"
                    ? "/images/logo-light.png"
                    : "/images/logo-dark.png"
                }
                alt="AEGIS Logo"
                className="w-10 h-10"
              />
            </div>
            <h1 className="text-blue-600 dark:text-emerald-400">AEGIS</h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Predictive Maintenance Copilot
          </p>
        </div>
      </div>
    </div>
  );
}
