export class Patient {
    id?:number;
    doctorId?:number;
    name:string = "";
    surname:string = "";
    email:string = "";
    phone:string = "";
    streetAddress:string = "";
    city:string = "";
    region:string = "";
    dateTime:Date = new Date;
}