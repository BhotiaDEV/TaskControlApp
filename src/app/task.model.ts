export class TaskModel{
    constructor(private task:string, 
        private creator:string, 
        private start:string, 
        private end:string, 
        private tasktype:string,
        private isCompleted: boolean){
        }
}