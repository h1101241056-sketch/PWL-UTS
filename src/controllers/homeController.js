import { render } from "../config/viewEngine";

export const home = async (c) => {
  try {
    const html = await render(
      "home",
      {
        title: "Dashboard Bun MVC",
        message: "Hello dari Bun + Tailwind 🚀",
      },
      c // penting untuk currentPath
    );

    return c.html(html);

  } catch (error) {
    console.error("Home Controller Error:", error);
    return c.text("Terjadi kesalahan pada halaman Home", 500);
  }
};