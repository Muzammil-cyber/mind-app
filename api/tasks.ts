import { TaskType } from "@/types/task";
import app, { auth, db, firestore } from "@/utils/firebase.config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { query, collection, getDocs, where, addDoc } from "firebase/firestore";

export const useTaskList = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: async (): Promise<TaskType[]> => {
            try {
                // Check if user is logged in before making the query
                if (!auth.currentUser) {
                    return []; // Return empty array if not logged in
                }

                const taskRef = query(collection(firestore, 'tasks'), where("madeBy", "==", auth.currentUser.uid));
                const taskSnapshot = await getDocs(taskRef);

                const taskList = taskSnapshot.docs.map(doc => ({
                    ...doc.data(), id: doc.id, title: doc.data().title,
                    description: doc.data().description, priority: doc.data().priority, completed: doc.data().completed,
                    dueAt: doc.data().dueAt, madeBy: doc.data().madeBy
                }));
                return taskList;
            } catch (error) {
                throw error; // Or throw an error for further handling
            }

        }
    });

}

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (task: TaskType) => {
            try {
                const docRef = await addDoc(collection(firestore, 'tasks'), task);
                return docRef.id;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });
}

