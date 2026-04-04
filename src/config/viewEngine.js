import ejs from "ejs";
import { readFile } from "fs/promises";

export const render = async (view, data = {}, req = null) => {
  try {
    // path file view
    const viewPath = `./src/views/${view}.ejs`;
    const layoutPath = `./src/views/layout.ejs`;

    // baca file
    const [viewTemplate, layoutTemplate] = await Promise.all([
      readFile(viewPath, "utf-8"),
      readFile(layoutPath, "utf-8"),
    ]);

    // render isi view
    const content = ejs.render(viewTemplate, data);

    // render layout + inject content
    return ejs.render(layoutTemplate, {
      ...data,
      body: content,
      currentPath: req?.path || "",
    });

  } catch (error) {
    console.error("Render Error:", error);
    return `<h1>Terjadi error saat render view</h1>`;
  }
};