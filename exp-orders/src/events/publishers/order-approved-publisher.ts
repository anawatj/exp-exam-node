import {Publisher, Subjects, OrderApprovedEvent } from "@taobooks/common";

export class OrderApprovePublisher extends Publisher<OrderApprovedEvent>{
    subject: Subjects.OrderApproved=Subjects.OrderApproved
}