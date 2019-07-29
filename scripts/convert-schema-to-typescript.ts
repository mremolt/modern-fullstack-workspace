import fs from 'fs';
import glob from 'glob';
import path from 'path';

import { compileFromFile } from 'json-schema-to-typescript';

// compile from file
// compileFromFile('foo.json').then(ts => fs.writeFileSync('foo.d.ts', ts));

glob('libs/models/**/*.schema.json', (error, files) => {
  console.error(error);
  console.log(files);

  files.forEach(filePath => {
    const directory = path.dirname(filePath);
    const entityName = path.basename(filePath).replace('.schema.json', '');
    console.log(directory, entityName);
    const targetPath = path.join(directory, `${entityName}.d.ts`);

    compileFromFile(filePath, {
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
    }).then(ts => fs.writeFileSync(targetPath, ts));
  });
});
