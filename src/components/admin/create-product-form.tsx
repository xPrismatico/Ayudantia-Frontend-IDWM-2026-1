"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CreateProductFormValues, createProductSchema } from "@/lib/validations/admin-product";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProduct } from "@/hooks/useAdminProducts";
import { useCatalogFilters } from "@/hooks/useCatalogFilters";

export function CreateProductForm() {
  const router = useRouter();
  const { mutateAsync: createProduct, isPending } = useCreateProduct();
  const { categories, brands, isLoading: isCatalogLoading } = useCatalogFilters();

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryName: "",
      brandName: "",
      imagesFiles: [],
    },
  });

  const onSubmit = async (data: CreateProductFormValues) => {
    try {
      await createProduct(data);
      toast.success("Producto creado exitosamente");
      router.push("/admin/products");
    } catch (error: unknown) {
      // Verificamos si el error es de Axios para poder leer error.response de forma segura
      if (axios.isAxiosError(error)) {
        // intentamos leer un msg directo (GenericResponse)
        let errorMessage = error.response?.data?.message;
        // si no existe, buscamos si es un error de validacion de .NET (ProblemDetails)
        const validationErrors = error.response?.data?.errors;

        if (validationErrors) {
          // Extraemos el primer error de validacion que encuentre
          const firstKey = Object.keys(validationErrors)[0];
          errorMessage = validationErrors[firstKey][0];
        }

        toast.error(errorMessage || "Ocurrió un error al crear el producto.");
      } else {
        toast.error("Ocurrió un error inesperado al crear el producto.");
      }
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Campo Nombre del Producto */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Producto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Asus ROG Strix" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Precio */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio (CLP)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ej. 1500000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Stock */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Inicial</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ej. 10"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Selector de Categoría */}
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>

                  {/* Selector de Categoría segun el catálogo */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isCatalogLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isCatalogLoading ? "Cargando..." : "Selecciona una categoría"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Selector de Marca */}
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>

                  {/* Selector de Marca segun el catálogo */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isCatalogLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={isCatalogLoading ? "Cargando..." : "Selecciona una marca"}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands?.map((brand) => (
                        <SelectItem key={brand.id} value={brand.name}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción Técnica</FormLabel>
                <FormControl>
                  <Input placeholder="Especificaciones, rendimiento..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imagesFiles"
            // Excelente práctica: Sacamos "value" de ...rest porque el input type="file" no soporta el atributo "value" programático
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Imágenes del Producto</FormLabel>
                <FormControl>
                  <div className="flex w-full items-center justify-center">
                    <label
                      className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100"
                      onDragOver={(e) => e.preventDefault()} // Impide que navegador abra la imagen
                      onDrop={(e) => {
                        e.preventDefault(); // Evita el comportamiento por defecto
                        const files = e.dataTransfer.files; // Captura los archivos soltados
                        if (files && files.length > 0) {
                          onChange(Array.from(files)); // Se inyectan a React Hook Form
                        }
                      }}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="mb-2 h-8 w-8 text-slate-500" />
                        <p className="mb-1 text-sm text-slate-500">
                          <span className="font-semibold">Haz clic para subir</span> o arrastra
                        </p>
                        <p className="text-xs text-slate-500">PNG, JPG o WEBP</p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            onChange(Array.from(files));
                          }
                        }}
                        {...rest}
                      />
                    </label>
                  </div>
                </FormControl>
                {value && value.length > 0 && (
                  <FormDescription className="font-medium text-emerald-600">
                    {value.length} archivo(s) seleccionado(s).
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4 border-t border-slate-100 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              disabled={isPending}
            >
              {isPending ? "Guardando..." : "Crear Producto"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
