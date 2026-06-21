import { expect, test } from "@playwright/test";

test.describe("Flujo de Transaccionalidad y Pedidos", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Ingresar" }).click();
    await page.getByLabel("Correo Electrónico").fill("srfuentesavila@gmail.com");
    await page.getByLabel("Contraseña").fill("Admin1234!");
    await page.getByRole("button", { name: "Ingresar" }).click();

    // Esperamos que el backend responda con éxito antes de avanzar
    const successToast = page
      .locator("[data-sonner-toast]")
      .filter({ hasText: "¡Bienvenido de nuevo!" });
    await expect(successToast).toBeVisible();

    // Esperamos a que Next.js nos devuelva a la home tras el login
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("button", { name: "Cerrar Sesión" })).toBeVisible();
  });

  test("Esta prueba debe completar el flujo de compra desde el catálogo hasta el detalle de la orden", async ({
    page,
  }) => {
    // 1. Navegar al catálogo
    await page.getByRole("link", { name: "Catálogo" }).click();
    await expect(page).toHaveURL(/.*products/);

    // 2. Buscar botón de agregar con stock
    const agregarBtn = page.locator('button:has-text("Agregar"):not([disabled])').first();
    await agregarBtn.click();

    // 3. Filtrar los Toasts de Sonner para buscar el que dice "Producto agregado"
    // Esto evita que Playwright se confunda con el Toast de "Bienvenido"
    const toastProducto = page
      .locator("[data-sonner-toast]")
      .filter({ hasText: "Producto agregado" });
    await expect(toastProducto).toBeVisible();

    // 4. Navegar al carrito
    await page.getByRole("link", { name: /Ver carrito/i }).click();
    await expect(page).toHaveURL(/.*cart/);

    // 5. Proceder al Checkout
    await page.getByRole("button", { name: "Proceder al Checkout" }).click();
    await expect(page).toHaveURL(/.*checkout/);

    // 6. Confirmar la compra
    await page.getByRole("button", { name: "Confirmar y Comprar" }).click();

    // 7. Esperar a la URL de la Orden (ej: /orders/ORD-260515123456-123)
    await expect(page).toHaveURL(/\/orders\/ORD-.*/);

    // 8. Verificar UI de éxito
    await expect(page.getByRole("heading", { name: /Pedido ORD-/ })).toBeVisible();
    await expect(page.getByRole("button", { name: "Descargar Boleta PDF" })).toBeVisible();
  });
});
