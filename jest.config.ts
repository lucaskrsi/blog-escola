// jest.config.ts

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'], // diretório onde estão os testes
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // ajuste conforme a estrutura do seu projeto
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;