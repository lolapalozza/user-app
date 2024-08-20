const ORDER_STATUS = {
  "CREATED": "Created",
  "ASSIGNED": "Assigned to Storeman",
  "SENT": "Sent",
  "RECEIVED": "Received",
  "CANCELLED": "Cancelled"
}

export const getInpostStatus = (order) => {
  if(order.cancelled_at){
    return ORDER_STATUS.CANCELLED
  }
  if(order.received_at){
    return ORDER_STATUS.RECEIVED
  }
  if(order.sent_at){
    return ORDER_STATUS.SENT
  }
  if(order.assigned_at){
    return ORDER_STATUS.ASSIGNED
  }
  if(order.created_at){
    return ORDER_STATUS.CREATED
  }
}
