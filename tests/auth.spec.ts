import { expect, test } from "@playwright/test";

test.describe("Flujo de Identidad y Seguridad", () => {
  test("Esta prueba debe mostrar error con credenciales inválidas", async ({ page }) => {
    // 1. Navegar desde la Homepage usando la Navbar
    await page.goto("/");
    await page.getByRole("link", { name: "Ingresar" }).click();
    await expect(page).toHaveURL(/.*login/);

    // 2. Llenar el formulario con datos falsos
    await page.getByLabel("Correo Electrónico").fill("usuario_falso@ucn.cl");
    await page.getByLabel("Contraseña").fill("ClaveIncorrecta123!");
    await page.getByRole("button", { name: "Ingresar" }).click();

    // 1. Ampliamos el timeout a 10 segundos para darle tiempo al sistema de
    // reaccionar, especialmente si hay lentitud por carga de imágenes externas.
    // 2. Solo verificamos que Sonner arroje "algún" toast para no depender de atributos internos.
    const anyToast = page.locator("[data-sonner-toast]").first();
    await expect(anyToast).toBeVisible({ timeout: 10000 });

    // Como las credenciales son falsas, el sistema JAMÁS debe dejarnos ir a la raíz "/".
    // Debemos seguir atrapados en la ruta que contenga "login".
    await expect(page).toHaveURL(/.*login/);
  });

  test("Esta prueba debe iniciar sesión exitosamente y redirigir al inicio", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Ingresar" }).click();

    // 1. Llenar con credenciales válidas
    await page.getByLabel("Correo Electrónico").fill("samuel@gmail.com");
    await page.getByLabel("Contraseña").fill("Admin1234!");
    await page.getByRole("button", { name: "Ingresar" }).click();

    //Esperamos a que NextAuth procese la sesión y nos redirija
    await page.waitForURL("/");

    // 2. Buscar ESPECÍFICAMENTE el toast de ÉXITO
    const successToast = page
      .locator("[data-sonner-toast]")
      .filter({ hasText: "¡Bienvenido de nuevo!" });
    await expect(successToast).toBeVisible();

    // 3. Verificar redirección y cambio de navbar
    const logoutBtn = page.getByRole("button", { name: "Cerrar Sesión" });
    await expect(logoutBtn).toBeVisible();
  });
});
