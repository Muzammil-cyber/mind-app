import { TaskType } from "@/types/task";
import app, { auth, db, firestore } from "@/utils/firebase.config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { query, collection, getDocs, where, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

export const useTaskListCompleted = () => {
    return useQuery({
        queryKey: ['tasks', "completed"],
        queryFn: async (): Promise<TaskType[]> => {
            try {
                // Check if user is logged in before making the query
                if (!auth.currentUser) {
                    return []; // Return empty array if not logged in
                }
                // QUERY WHERE TASKS ARE madeBy == auth.currentUser.uid AND completed == true
                const taskRef = query(collection(firestore, 'tasks'), where('madeBy', '==', auth.currentUser.uid), where('completed', '==', true));
                const taskSnapshot = await getDocs(taskRef)
                if (taskSnapshot.empty) return [];
                const tasks = taskSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as TaskType));
                return tasks;
            } catch (error) {
                throw error; // Or throw an error for further handling
            }

        }
    });
}
export const useTaskListUncompleted = () => {
    return useQuery({
        queryKey: ['tasks', "uncompleted"],
        queryFn: async (): Promise<TaskType[]> => {
            try {
                // Check if user is logged in before making the query
                if (!auth.currentUser) {
                    return []; // Return empty array if not logged in
                }
                // QUERY WHERE TASKS ARE madeBy == auth.currentUser.uid AND completed == false
                const taskRef = query(collection(firestore, 'tasks'), where('madeBy', '==', auth.currentUser.uid), where('completed', '==', false));
                const taskSnapshot = await getDocs(taskRef)
                if (taskSnapshot.empty) return [];
                const tasks = taskSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as TaskType));
                return tasks;
            } catch (error) {
                throw error; // Or throw an error for further handling
            }

        }
    });
}
export const useTaskCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (task: Omit<TaskType, "id">) => {
            try {
                // Check if user is logged in before making the query
                if (!auth.currentUser) {
                    return; // Return empty array if not logged in
                }
                // ADD TASK TO FIRESTORE
                const docRef = await addDoc(collection(firestore, 'tasks'), { ...task, madeBy: auth.currentUser.uid });
                return docRef.id;
            } catch (error) {
                throw error; // Or throw an error for further handling
            }

        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks'],
            });
        }
    });
}

// Mutate complete a Task
export const useTaskComplete = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (taskId: string) => {
            try {
                // Check if user is logged in before making the query
                if (!auth.currentUser) {
                    return; // Return empty array if not logged in
                }
                // UPDATE TASK TO FIRESTORE
                await updateDoc(doc(firestore, `tasks/${taskId}`), { completed: true });
            } catch (error) {
                throw error; // Or throw an error for further handling
            }

        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks'],
            });
        }
    });
}

// Delete

export const useTaskDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (taskId: string) => {
            try {
                // Check if user is logged in before making the query
                if (!auth.currentUser) {
                    return; // Return empty array if not logged in
                }
                // DELETE TASK FROM FIRESTORE
                await deleteDoc(doc(firestore, `tasks/${taskId}`));
            } catch (error) {
                throw error; // Or throw an error for further handling
            }

        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks'],
            });
        }
    });
}

