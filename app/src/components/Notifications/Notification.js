export class Notification {
    id;
    message;
    type;
    time;
    timer;

    constructor(message, type) {
        this.id = Notification.counter++;
        this.message = message;
        this.type = type;
        this.time = NotificationTimers[type];
    }

    static counter = 0;
}


export const NotificationTypes = {
    SUCCESS: 'SUCCESS',
    WARNING: 'WARNING',
    INFO: 'INFO',
    ERROR: 'ERROR'
};

export const NotificationTimers = {
    [NotificationTypes.SUCCESS]: 3000,
    [NotificationTypes.WARNING]: 7000,
    [NotificationTypes.INFO]: 7000,
    [NotificationTypes.ERROR]: 12000
};
