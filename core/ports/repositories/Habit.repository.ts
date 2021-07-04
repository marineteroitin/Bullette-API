import Habit from "../../domain/Habit.domain";
import User from "../../domain/User.domain";

export default interface HabitRepository {

    createHabit(habit: Habit): Promise<Habit>;
    updateHabit(habit: Habit): Promise<Habit>;
    validateHabit(habit: Habit): Promise<Habit>;

    getDailyHabits(user: User): Promise<Habit[]>;
    getHabitTracker(user: User): Promise<Habit[]>;

    //sendReminder() ??
}
