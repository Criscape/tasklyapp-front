interface Base {
    createdAt: Date;
    updateAt: Date;
}

export interface ITask extends Base {
    _id: String;
    userId: String;
    stateId: String;
    state: String;
    description: String;
    deadline: Date;
}

export interface IState extends Base {
    _id: String;
    name: String;
    description: String;
}

export enum State {
    Well = '5fb95271c020d53c9be845ed',
    Worrying = '5fb95271c020d53c9be845ee',
    Expired = '5fb95271c020d53c9be845ef',
    Done = '5fb95271c020d53c9be845f0',
    Deleted = '5fb95271c020d53c9be845f1'
}

export interface DialogData {
    description: String;
}