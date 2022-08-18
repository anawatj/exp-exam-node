path:`/api/users/signup`
method: `POST`
body:
json `
    {
        "email":string,
        "password":string
    }
`
example:
`{
    "username":"test@gmail.com",
    "password":"12345678"
}`
respoonse :
`{
    email:String,
    password:String
}`