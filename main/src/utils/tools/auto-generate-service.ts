import * as readline from 'readline';
import { writeFile } from 'fs';

function camelToSnakeCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

function pascalToCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function createService() {
  return `import { BaseCrudService } from '@/service/base/base.service';
import { I${ModuleInPascal}Service } from '@/service/interface/i.${module_in_snake_case}.service';
import { inject, injectable } from 'inversify';

@injectable()
export class ${ModuleInPascal}Service implements I${ModuleInPascal}Service {}
`;
}

function createIService() {
  return `export interface I${ModuleInPascal}Service {}
`;
}

function createController() {
  return `
import { I${ModuleInPascal}Service } from '@/service/interface/i.${module_in_snake_case}.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ${ModuleInPascal}Controller {
private ${moduleInCamelCase}Service: I${ModuleInPascal}Service;
constructor(
@inject('${ModuleInPascal}Service') ${moduleInCamelCase}Service: I${ModuleInPascal}Service
) {
this.${moduleInCamelCase}Service = ${moduleInCamelCase}Service;
}
}
`;
}

function createContainer() {
  return `
import { ${ModuleInPascal}Controller } from '@/controller/${module_in_snake_case}.controller';
import { ${ModuleInPascal}Service } from '@/service/${module_in_snake_case}.service';
import { I${ModuleInPascal}Service } from '@/service/interface/i.${module_in_snake_case}.service';
import { Container } from 'inversify';

class ${ModuleInPascal}Container{
  private container = new Container();
  constructor() {
this.container.bind<I${ModuleInPascal}Service>('${ModuleInPascal}Service').to(${ModuleInPascal}Service);
this.container.bind<${ModuleInPascal}Controller>(${ModuleInPascal}Controller).toSelf();
}

export() {
    const ${moduleInCamelCase}Controller = this.container.get<${ModuleInPascal}Controller>(${ModuleInPascal}Controller);
    const ${moduleInCamelCase}Service = this.container.get<I${ModuleInPascal}Service>('${ModuleInPascal}Service');

return { ${moduleInCamelCase}Controller, ${moduleInCamelCase}Service};
}
}

const ${moduleInCamelCase}Container = new ${ModuleInPascal}Container();
const { ${moduleInCamelCase}Controller, ${moduleInCamelCase}Service} = ${moduleInCamelCase}Container.export();
export { ${moduleInCamelCase}Controller, ${moduleInCamelCase}Service};
`;
}

function createRoute() {
  return `import express from 'express';
const ${moduleInCamelCase}Router = express.Router();

export default ${moduleInCamelCase}Router;
`;
}

let moduleInCamelCase: string;
let ModuleInPascal: string;
let module_in_snake_case: string;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createFile(content: string, path: string) {
  writeFile(path, content.trim(), (err) => {
    if (err) {
      console.error('Có lỗi xảy ra khi ghi file:', err);
    } else {
      console.log(`Đã tạo file ${path} thành công!`);
    }
    rl.close();
  });
}

rl.question('Nhập tên Module dạng PascalCase, ví dụ CourseCategory: ', (input: string) => {
  ModuleInPascal = input;
  moduleInCamelCase = pascalToCamelCase(ModuleInPascal);
  module_in_snake_case = camelToSnakeCase(moduleInCamelCase);

  const service = createService();
  const servicePath = `src/service/${module_in_snake_case}.service.ts`;
  createFile(service, servicePath);

  const iService = createIService();
  const iServicePath = `src/service/interface/i.${module_in_snake_case}.service.ts`;
  createFile(iService, iServicePath);

  const controller = createController();
  const controllerPath = `src/controller/${module_in_snake_case}.controller.ts`;
  createFile(controller, controllerPath);

  const container = createContainer();
  const containerPath = `src/container/${module_in_snake_case}.container.ts`;
  createFile(container, containerPath);

  const route = createRoute();
  const routePath = `src/routes/${module_in_snake_case}.route.ts`;
  createFile(route, routePath);
});
