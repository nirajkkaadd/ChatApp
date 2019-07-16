let Pubnub = require('pubnub')

let pubnub = new Pubnub({
    subscribeKey: 'sub-c-c29328b2-7957-11e8-a728-026b18d394b5',
    publishKey: 'pub-c-6bbd9e58-48bf-4406-982e-52c6f02b5a0a',
    secretKey: 'sec-c-ZmQ3ZmVkYjktMjRjNS00ZTc3LWIyY2ItZWJmYzRjMzA5ZjI5',
    ssl: true
})

pubnub.addListener({
    status: function(statusEvent) {
        if(statusEvent.category === 'PNConnectedCategory') {
            let payLoad = {
                my: 'payload'
            }
            pubnub.publish({
                message: payLoad,
                channel: 'my_channel'
            }, function(status) {
                console.log('publish status : ', status)
            })
        }
    },
    message: function(message) {
        console.log('message1: ', message)
    },
    presence: function (presenceEvent) {
        console.log('presence Event ', presenceEvent)
    }
})

pubnub.subscribe({
    channels: ['my_channel']
})

pubnub.publish({
    message: {
        such: 'object'
    },
    channel: 'my_channel',
    sendByPost: false,
    storeInHistory: false,
    meta: {
        cool: 'meta'
    }
}, function(status, response) {
    if(status.error) {
        console.log('publish1 :', status)
    } else {
        console.log('message published w/ timetoken : ', response.timetoken)
    }
})