import type {Config} from 'jest';

const config: Config = {
	transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
	extensionsToTreatAsEsm: ['.ts'],
}

export default config;
