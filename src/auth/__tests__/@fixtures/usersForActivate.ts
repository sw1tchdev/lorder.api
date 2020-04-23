import { createHash } from 'crypto';

import { ROLES } from '../../../@orm/role';
import { createUsers } from '../../../@test-helper/@fixtureCreators';

import { User } from '../../../@orm/user';

export const usersFixture = createUsers([
  {
    email: 'no-password@mail.com',
    roles: [{ name: ROLES.USER }],
    status: User.JUST_CREATED,
  },
  {
    email: 'user+password@mail.com',
    password: createHash('md5')
      .update('correct password')
      .digest('hex'),
    roles: [{ name: ROLES.USER }],
    status: User.JUST_CREATED,
  },
  {
    email: 'with-project@mail.com',
    roles: [{ name: ROLES.USER }],
    status: User.JUST_CREATED,
  },
  {
    email: 'super-admin@mail.com',
    roles: [{ name: ROLES.USER }, { name: ROLES.ADMIN }, { name: ROLES.SUPER_ADMIN }],
  },
]);