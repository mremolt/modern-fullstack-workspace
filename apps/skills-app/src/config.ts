import { API_BASE_URL, diContainer } from '@mr/core';

diContainer.bind(API_BASE_URL).toConstantValue('http://localhost:3000/v1');
