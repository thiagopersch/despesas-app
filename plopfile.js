const fs = require('fs');
const path = require('path');

module.exports = function (plop) {
  plop.setGenerator('create files', {
    description: 'Cria arquivos para um novo recurso',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nome do recurso (ex: Category):',
      },
    ],
    actions: function (data) {
      const actions = [];

      function addActionIfNotExists(filePath, templateFile) {
        if (!fs.existsSync(filePath)) {
          actions.push({
            type: 'add',
            path: filePath,
            templateFile: templateFile,
          });
        } else {
          console.log(`Arquivo já existe: ${filePath}`);
        }
      }

      // Model
      addActionIfNotExists(
        'src/model/{{pascalCase name}}.ts',
        'generators/templates/model.hbs',
      );

      // Mutations
      addActionIfNotExists(
        'src/requests/mutations/{{camelCase name}}.tsx',
        'generators/templates/mutation.hbs',
      );

      // Queries
      addActionIfNotExists(
        'src/requests/queries/{{camelCase name}}.ts',
        'generators/templates/query.hbs',
      );

      // Hooks
      addActionIfNotExists(
        'src/hooks/useDelete{{pascalCase name}}WithConfirmation.tsx',
        'generators/templates/hook.hbs',
      );

      // Components
      addActionIfNotExists(
        'src/components/{{pascalCase name}}/Edit/index.tsx',
        'generators/templates/editComponent.hbs',
      );
      addActionIfNotExists(
        'src/components/{{pascalCase name}}/Edit/styles.ts',
        'generators/templates/editStyles.hbs',
      );
      addActionIfNotExists(
        'src/components/{{pascalCase name}}/Edit/schema/index.ts',
        'generators/templates/editSchema.hbs',
      );
      addActionIfNotExists(
        'src/components/{{pascalCase name}}/Show/index.tsx',
        'generators/templates/showComponent.hbs',
      );

      // Templates
      addActionIfNotExists(
        'src/templates/{{pascalCase name}}/index.tsx',
        'generators/templates/showTemplate.hbs',
      );
      addActionIfNotExists(
        'src/templates/{{pascalCase name}}/create/index.tsx',
        'generators/templates/createTemplate.hbs',
      );
      addActionIfNotExists(
        'src/templates/{{pascalCase name}}/create/styles.ts',
        'generators/templates/createStyles.hbs',
      );
      addActionIfNotExists(
        'src/templates/{{pascalCase name}}/create/schema/index.ts',
        'generators/templates/createSchema.hbs',
      );

      // App route
      addActionIfNotExists(
        'src/app/(admin)/{{camelCase name}}/page.tsx',
        'generators/templates/page.hbs',
      );

      return actions;
    },
  });
};
