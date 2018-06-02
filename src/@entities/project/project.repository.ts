import { EntityRepository, Repository } from 'typeorm';

import { Project } from './project.entity';
import { ProjectDto } from './dto';
import { User } from '../user/user.entity';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {

  findAllByOwner(owner: User): Promise<Project[]> {
    return this.find({
      // select: ['id', 'title', 'monthlyBudget'],
      where: { owner },
      relations: ['owner'],
      loadRelationIds: true,
      // loadEagerRelations: false,
    });
  }

  findOneByOwner(id: number, owner: User): Promise<Project> {
    return this.findOneOrFail({id, owner });
  }

  createByUser(data: ProjectDto, creator: User): Promise<Project> {
    const project = this.create(data);
    project.creator = creator;
    project.updator = creator;
    project.owner = creator;
    return this.save(project);
  }

}