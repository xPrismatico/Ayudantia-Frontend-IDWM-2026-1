import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // getToken extrae la sesion desencriptada que tiene NextAuth, directamente desde la request
  const token = await getToken({ req });
  const path = req.nextUrl.pathname;

  // 1. PROTECCIÓN DE RUTAS GENERALES

  // Un usuario ya logueado NO debería poder ver el Login, Register o Verify
  const isAuthRoute = path === "/login" || path === "/register" || path === "/verify";
  if (token && isAuthRoute) {
    // Lo redirigimos
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2. PROTECCIÓN DE RUTAS PRIVADAS (Requieren Sesión primero)

  // Si NO hay token y quiere entrar a zonas privadas, lo mandamos al login
  const isProtectedRoute =
    path.startsWith("/admin") || path.startsWith("/checkout") || path.startsWith("/cart");
  if (!token && isProtectedRoute) {
    const url = new URL("/login", req.url);
    // Guardamos a dónde quería ir para devolverlo tras el login
    url.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(url);
  }

  // 3. AUTORIZACIÓN POR ROL: ADMINISTRADOR
  // Solo los Admins pueden entrar a /admin
  if (path.startsWith("/admin") && token?.role !== "Admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // 4. AUTORIZACIÓN POR ROL: CLIENTE/COMPRADOR
  // Exigimos que el rol sea Customer para acceder a /checkout, /cart o /orders
  const isCustomerRoute =
    path.startsWith("/checkout") || path.startsWith("/cart") || path.startsWith("/orders");
  if (isCustomerRoute && token?.role !== "Customer") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

// El matcher define qué rutas pasan por este filtro (optimización de rendimiento)
export const config = {
  matcher: [
    "/admin/:path*",
    "/checkout/:path*",
    "/cart/:path*",
    "/orders/:path*",
    "/login",
    "/register",
    "/verify",
  ],
};
