import type { Metadata } from "next";

import HomeView from "@/views/home/home-view";

export const metadata: Metadata = {
  title: "Inicio - Tienda UCN",
  description: "Bienvenido a la Tienda UCN. Explora nuestro catálogo.",
};

export default function HomePage() {
  return <HomeView />;
}
