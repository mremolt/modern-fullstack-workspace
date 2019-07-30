import fs from 'fs';
import glob from 'glob';
import { compile } from 'json-schema-to-typescript';
import path from 'path';

glob('./libs/models/**/*.schema.ts', (_error, files) => {
  files.forEach(async filePath => {
    const directory = path.dirname(filePath);
    const entityName = path.basename(filePath).replace('.schema.ts', '');
    const importPath = path.resolve(filePath).replace('.ts', '');
    const targetPath = path.join(directory, `${entityName}.ts`);

    const schema = await import(importPath);

    const ts = await compile(schema, entityName, {
      declareExternallyReferenced: true,
      style: {
        bracketSpacing: true,
        printWidth: 120,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
      },
    });

    fs.writeFileSync(targetPath, ts);
  });
});
