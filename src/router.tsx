import React from 'react';
import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import { Navbar } from './components/Navbar';
import { MenuPage } from './pages/MenuPage';
import { RadarPage } from './pages/RadarPage';
import { RoomPage } from './pages/RoomPage';

// 1. Root Route
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E1E1E] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6">
        <Outlet />
      </main>
    </div>
  ),
});

// 2. Child Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: MenuPage,
});

const radarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/radar',
  component: RadarPage,
});

const roomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/room',
  component: RoomPage,
});

// 3. Router
const routeTree = rootRoute.addChildren([indexRoute, radarRoute, roomRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
