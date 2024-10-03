import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";

const main = async () => {
  const pdfFile = await fs.readFile("./fundae-editable.pdf");
  const pdfDoc = await PDFDocument.load(pdfFile);
  const form = pdfDoc.getForm();

  // Seleccionar todos los campos
  const allFields = form.getFields();

  // Seleccionar un campo por su name
  const ageField = form.getField("age");

  for (const field of allFields) {
    // Obtener el nombre de un campo
    const name = field.getName();
    console.log(name);

    // Ver de qué tipo es el campo (PDFCheckBox, PDFTextField, etc)
    // https://pdf-lib.js.org/docs/api/classes/pdffield
    if (field.constructor.name === "PDFCheckBox") {
      // Marcar un checkbox
      field.check();
    }
  }

  // Escribir en un campo de tipo PDFTextField
  ageField.setText("25");

  // Generar el PDF nuevo en formato Uint8Array
  const pdfBytes = await pdfDoc.save();

  // Aquí yo lo guardo con writeFile, pero imagino que tendrás que enviarlo en el body de la respuesta
  await fs.writeFile("./fundae-modificado.pdf", pdfBytes);
};

main();
