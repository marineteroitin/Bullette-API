import Task from "../../domain/Task.domain";
import User from "../../domain/User.domain";
import Habit from "../../domain/Habit.domain";

export default interface TaskRepository {
    createTask(task: Task): Promise<Task>;
    updateTask(task: Task): Promise<Task>;
    setCompletedTask(id: any): Promise<Task>;

    getDailyTasks(user: User): Promise<Task[]>;
    getDailyEvents(user: User): Promise<Task[]>;

    //getWeeklyEvents(user: User): Promise<Task[]>;

    //sendEventReminder() ??
}
