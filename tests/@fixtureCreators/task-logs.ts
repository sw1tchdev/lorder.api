import { random } from 'faker';
import moment = require('moment');
import { fixtureCreator, one } from 'typeorm-fixtures';

import { Task } from '../../src/@orm/task';
import { TASK_CHANGE_TYPE, TaskLog } from '../../src/@orm/task-log';
import { User } from '../../src/@orm/user';

export const createTaskLogs = fixtureCreator<TaskLog>(TaskLog, function(entity, index) {
  return {
    changeType: TASK_CHANGE_TYPE.UPDATE,
    createdAt: moment().subtract(1440 - index, 'minutes'),
    description: random.words(),
    prevVersion: undefined,
    ...entity,
    createdBy: one(this, User, entity.createdBy),
    task: one(this, Task, entity.task),
  };
});
