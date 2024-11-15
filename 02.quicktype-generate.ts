const exampleBooking = require("./exampleBooking.json");

import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from "quicktype-core";

async function generateZodSchemaScript(json: any) {
  const jsonString = JSON.stringify(json);
  const jsonInput =
    jsonInputForTargetLanguage("typescript");
  await jsonInput.addSource({
    name: "RoomBooking",
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const { lines } = await quicktype({
    inputData,
    lang: "typescript",
    rendererOptions: { framework: "zod" },
  });

  return lines.join("\n");
}

import fs from 'fs'

generateZodSchemaScript(exampleBooking).then((output) => {
  fs.writeFileSync('quicktype-generator.ts', output)
});
