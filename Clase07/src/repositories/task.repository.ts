import { getConnection } from '../services/sequelize.service';
import { Task } from '../models/task.model';

export default class TaskRepository {
  async list() {
    const taskRepository = getConnection().getRepository(Task);
    const tasks = await taskRepository.findAll();

    return tasks.length > 0 ? tasks : null;
  }

  async insert(task: Task) {
    const taskRepository = getConnection().getRepository(Task);
    const taskInserted = await taskRepository.create(task);

    return taskInserted;
  }

  async update(id: number, task: Task) {
    const taskRepository = getConnection().getRepository(Task);
    const status = await taskRepository.update(task, {
      where: { id },
    });

    return status ? status : null;
  }

  async delete(id: number) {
    const taskRepository = getConnection().getRepository(Task);
    const status = await taskRepository.destroy({
      where: { id },
    });

    return status ? status : null;
  }
}
