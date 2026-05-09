export default function Footer() {
  return (
    <footer className="border-t bg-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Tienda UCN. Todos los derechos reservados.</p>
        <p className="mt-2">Desarrollado para Introducción al Desarrollo Web/Móvil</p>
      </div>
    </footer>
  );
}