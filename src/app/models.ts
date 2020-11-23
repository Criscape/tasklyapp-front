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