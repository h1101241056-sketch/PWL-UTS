import { render } from "../config/viewEngine";

export const home = async (req, res) => {
  try {
    const html = await render(
      "home",
      {
        title: "Dashboard MVC",
        message: "Hello dari Node + Tailwind 🚀",
      },
      req // penting untuk currentPath
    );

    return res.send(html);

  } catch (error) {
    console.error("Home Controller Error:", error);
    return res.status(500).send("Terjadi kesalahan pada halaman Home");
  }
};