import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';

export const generateTemplate = <T>(name: string, props: T): string => {
  const templatePath = path.join(__dirname, '..', 'src/templates', `${name}.hbs`);
  const templateSource = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(templateSource);
  return template(props);
};
