// id: 1,
// name: "Task 1",
// description: "Description of Task 1",
// dueAt: new Date("2024-12-31T23:59:59"),
// priority: 'HIGH',
// madeBy: "John Doe",
// completed: false

import { Timestamp } from "firebase/firestore";

export interface TaskType {
    id: string;
    title: string;
    description: string;
    dueAt: Timestamp;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    madeBy: string;
    completed: boolean;
}