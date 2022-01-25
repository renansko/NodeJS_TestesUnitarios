import { container } from 'tsyringe';

import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/users/repositories/UsersRepository';

import { IStatementsRepository } from '../../modules/statements/repositories/IStatementsRepository';
import { StatementsRepository } from '../../modules/statements/repositories/StatementsRepository';
import { PixRepository } from '../../modules/users/repositories/pixRepository';
import { IPixRepository } from '../../modules/users/repositories/IPixRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IStatementsRepository>(
  'StatementsRepository',
  StatementsRepository
);

container.registerSingleton<IPixRepository>(
  'PixRepository',
  PixRepository
);
