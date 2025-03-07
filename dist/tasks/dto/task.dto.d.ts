export declare class CreateTaskDto {
    title: string;
    body: string;
    userId: number;
}
export declare class UpdateTaskDto {
    title?: string;
    body?: string;
    isCompleted?: boolean;
}
