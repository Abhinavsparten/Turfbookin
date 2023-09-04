//import db.js file
const db = require('./db')
//import jwt
const jwt = require('jsonwebtoken')

register = (uid, uname, psw) => {
    // collection key:arg value
    return db.User.findOne({ uid }).then(user => {
        if (user) {
            return {
                message: "User already exists",
                status: false,
                statusCode: 404
            }
        }
        else {

            newuser = new db.User({
                uid: uid,
                uname: uname,
                psw: psw,
                profile: []

            })
            //save new object to reflect the change in database
            newuser.save()
            return {
                message: "registerd successfully",
                status: true,
                statusCode: 200
            }
        }

    })
}

login = (uid, psw) => {
    return db.User.findOne({ uid, psw }).then(user => {
        if (user) {
            //token generation
            const token = jwt.sign({ currentId: uid }, "secretkey123")
            return {
                message: "Login successfully ",
                status: true,
                statusCode: 200,
                currentUser: user.uname,
                currentId: user.uid,
                //send to client
                token

            }
        }
        else {
            return {
                message: "Incorrect userid or password  ",
                status: false,
                statusCode: 401
            }
        }
    })
}

getUser = uid => {
    return db.User.findOne({ uid }).then(user => {
        if (user) {
            return {
                message: user,
                status: true,
                statusCode: 200,

            }
        }
        else {
            return {
                message: "Incorrect Userid ",
                status: false,
                statusCode: 401
            }
        }
    })
}

profileAdd = (name, userid, age, pic, street, district, number) => {

    return db.User.findOne({ uid: userid }).then(result => {
        if (result) {

            result.profile.push(
                {
                    fullname: name,
                    age: age,
                    image: pic,
                    streetname: street,
                    districtname: district,
                    phoneno: number



                }
            )
            result.save()
            return {

                message: 'Profile Added',
                status: true,
                statusCode: 200

            }
        }
        else {
            return {
                message: "invalid data",
                status: false,
                statusCode: 404
            }
        }

    })

}
getProfile = (uid) => {
    return db.User.findOne({ uid }).then(user => {
        if (user) {
            return {
                message: user.profile,
                status: true,
                statusCode: 200,


            }
        }
        else {
            return {
                message: "invalid user",
                status: false,
                statusCode: 404
            }

        }
    })
}
turfAdd = (turfid, turfname, place, district, pin, fee, image, pname, phone, status,acno, uid) => {

    return db.Turf.findOne({ turfid }).then(data => {
        if (data) {
            return {
                message: "turf already exists",
                status: false,
                statusCode: 404
            }

        }
        else {

            newdata = new db.Turf({

                courtid: turfid,
                courtname: turfname,
                place: place,
                district: district,
                pin: pin,
                fee: fee,
                courtimage: image,
                propname: pname,
                contactno: phone,
                status: status,
                accno:acno,
                userid: uid


            }
            )

            newdata.save()

            return {

                message: 'Turf Added',
                status: false,
                statusCode: 200,
               

            }
        }

    })

}
getallTurf = (uid) => {
    return db.Turf.find({ userid: uid }).then(user => {
        if (user) {
            return {
                message: user,
                status: true,
                statusCode: 200,


            }
        }
        else {
            return {
                message: "invalid user",
                status: false,
                statusCode: 404
            }

        }
    })
}
getsingleTurf = (courtid) => {
    return db.Turf.findOne({ courtid }).then(user => {
        if (user) {
            return {
                message: user,
                status: true,
                statusCode: 200,
                currentDis:user.district,
                currentAcno:user.accno,
                currentFee:user.fee,
                courtId:user.courtid,
                


            }
        }
        else {
            return {
                message: "invalid user",
                status: false,
                statusCode: 404
            }

        }
    })
}

getallTurfuser = () => {
    return db.Turf.find().then(user => {
        if (user) {
            return {
                message: user,
                status: true,
                statusCode: 200,


            }
        }
        else {
            return {
                message: "invalid user",
                status: false,
                statusCode: 404
            }

        }
    })
}

getbookUser = (courtid) => {
    return db.Turf.findOne({ courtid }).then(user => {
        if (user) {
            return {
                message: user,
                status: true,
                statusCode: 200,
              


            }
        }
        else {
            return {
                message: "invalid user",
                status: false,
                statusCode: 404
            }

        }
    })
}

deleteac = (courtid) => {
    return db.Turf.deleteOne({ courtid }).then(user => {
        if (user) {
            return {
                message: "Court Deleted",
                status: true,
                statusCode: 200

            }
        }
        else {
            return {
                message: "Invalid court",
                status: false,
                statusCode: 404
            }

        }
    })
}

turfEdit = (courtid, turfname, place, district, pin, fee, image, pname, phone, status,acno) => {

    return db.Turf.findOne({ courtid }).then(data => {
        if (data) {

        
                data.courtname= turfname,
                data.place= place,
                data.district= district,
                data.pin= pin,
                data.fee= fee,
                data.courtimage=image,
                data.propname=pname,
                data.contactno=phone,
                data.status=status
                data.accno=acno



          

            data.save()

            return {

                message: 'Turf Updated',
                status: false,
                statusCode: 200,

            }

        }
        else {
            return {
                message: "turf already exists",
                status: false,
                statusCode: 404

            }

        }

    })

}
timeSlot = (st, et,courtid,today,uid,user,courtname) => {
    // collection key:arg value
    return db.Booking.findOne({ courtid,st,et }).then(data => {
        
         if (data) {
            return {
                message: "Slot not availabe",
                status: false,
                statusCode: 404
            }
        }
        else {

            newdata = new db.Booking({
                 courtid:courtid,
                 uid:uid,
                 user:user,
                 st:st,
                 et:et,
                 date:today,
                 courtname:courtname


            })
            //save new object to reflect the change in database
            newdata.save()
            return {
                message: "Make payment",
                status: true,
                statusCode: 200
            }
        }

    })
}

moneyTransfer = (tocno, urcno,  psw, amount) => {
    let amnt = parseInt(amount)
  
    return db.Bank.findOne({ acno: urcno, pass:psw }).then(result => {
        if (result) {
            return db.Bank.findOne({ acno: tocno }).then(data => {
                if (data) {
                    if (amnt > result.balance) {
                        return {

                            message: "insufficient balance",
                            status: false,
                            statusCode: 404

                        }
                    }
                    else {
                        result.balance -= amnt
                    
                        result.save()

                        data.balance += amnt
                      
                        data.save()

                        return {

                            message: 'Transaction Success,Slot Booked',
                            status: true,
                            statusCode: 200,
                            balance: result.balance

                        }


                    }

                }
                else {
                    return {
                        message: "invalid Acc Number Of Owner",
                        status: false,
                        statusCode: 404
                    }
                }
            })

        }
        else {
            return {
                message: "invalid Acc Number or Password",
                status: false,
                statusCode: 404
            }
        }
    })

}
getBookDetail = (courtid) => {
    return db.Booking.find({ courtid }).then(user => {
        if (user) {
            return {
                message: user,
                status: true,
                statusCode: 200,
              


            }
        }
        else {
            return {
                message: "invalid user",
                status: false,
                statusCode: 404
            }

        }
    })
}

deleteBooked = (courtid) => {
    return db.Booking.deleteMany({ courtid }).then(user => {
        if (user) {
            return {
                message: "Slotes Cleard",
                status: true,
                statusCode: 200

            }
        }
        else {
            return {
                message: "Invalid Data",
                status: false,
                statusCode: 404
            }

        }
    })
}

deleteMain = (uid) => {
    return db.User.deleteOne({ uid }).then(user => {
        if (user) {
            return {
                message: "Account Deleted",
                status: true,
                statusCode: 200

            }
        }
        else {
            return {
                message: "Invalid Data",
                status: false,
                statusCode: 404
            }

        }
    })
}

bookingdetailuser = (uid) => {
    return db.Booking.find({ uid }).then(user => {
        if (user) {
            return {
                message: user,
                status: true,
                statusCode: 200,
              


            }
        }
        else {
            return {
                message: "invalid data",
                status: false,
                statusCode: 404
            }

        }
    })
}


module.exports = {
    register, login, getUser, profileAdd, getProfile, turfAdd,
    getallTurf, getsingleTurf, getallTurfuser, deleteac, turfEdit,timeSlot,
    moneyTransfer,getBookDetail,deleteBooked,deleteMain,bookingdetailuser
}