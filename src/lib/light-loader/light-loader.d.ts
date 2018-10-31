declare module 'light-loader';

export interface ILightLoader {
  root: string;
  config: any;
  loaders: {
    file(lightLoaderConfig: any, type: string, name: string, source: any): Function;
  };
  load?(type: string): any;
  open(filename: string): any;
  resolve(root: string, type: string, name: string): string;
  support(moreTypes: any): void;
  deps(mapping: any): Function;
}
