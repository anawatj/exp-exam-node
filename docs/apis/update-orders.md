path:`/api/orders/:id`
method: `PUT`
params: id:String
body:
json `
  {
    "orderName":String,
    "orderDate":Date,
    "orderAmount":Float,
    "shipName":String,
    "shipAddress":String,
    "items":[
        {"bookId":String,"price":Float,"qty":Integer},
        {"bookId":String, "price":Float,"qty":Integer}
    ]
}
`
example:
`{{
    "orderName":"Anawat Jarusiripot",
    "orderDate":"2022-08-18",
    "orderAmount":200,
    "shipName":"Anawat Jarusiripot",
    "shipAddress":"Bangkok",
    "items":[
        {"bookId":"62fde9098d472666bd190989","price":200,"qty":3},
        {"bookId":"62fde9158d472666bd19098b", "price":300,"qty":13}
    ]
}`
respoonse :
`{
    "orderName": "Anawat Jarusiripot",
    "orderDate": "2022-08-18T00:00:00.000Z",
    "orderAmount": 200,
    "orderStatus": "waiting",
    "shipName": "Anawat Jarusiripot",
    "shipAddress": "Bangkok",
    "items": [
        {
            "bookId": "62fde9098d472666bd190989",
            "price": 200,
            "qty": 3
        },
        {
            "bookId": "62fde9158d472666bd19098b",
            "price": 300,
            "qty": 13
        }
    ],
    "userId": "62fde8f846ec72017634def8",
    "version": 0,
    "id": "62fde937d58126f421428f4f"
}`