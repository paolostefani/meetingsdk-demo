const client = ZoomMtgEmbedded.createClient()

let meetingSDKElement = document.getElementById('meetingSDKElement')

const urlParams = new URLSearchParams(window.location.search);
const meet = urlParams.get('meet');
console.log('*** meet = ', meet);

var meetingNumber = '9630566849';
var passWord = 'qpUK4b';
var userName = 'Paolo';
var role = 1;

if (meet === "1") {
  meetingNumber = '9630566849';
  passWord = 'qpUK4b';
  userName = 'Paolo';
  role = 1;
} else if (meet === "2") {
  meetingNumber = '8035893415';
  passWord = '4Yc8Sm';
  userName = 'Stanza 2';
  role = 0;
} else if (meet === "3") {
  meetingNumber = '9630566849';
  passWord = 'qpUK4b';
  userName = 'Gino';
  role = 0;
}


var authEndpoint = 'https://fathomless-badlands-78122-9ef418803988.herokuapp.com/'
var sdkKey = '0NfU5ntyRJCqLaV_ol4pFA'
var userEmail = ''
var registrantToken = ''
var zakToken = ''
var leaveUrl = 'https://servizionline.camcom.it/'

client.init({
  zoomAppRoot: meetingSDKElement,
  language: 'it-IT',
  customize: {
    video: {
      isResizable: true,
      viewSizes: {
        default: {
          width: 1000,
          height: 600
        },
        ribbon: {
          width: 300,
          height: 700
        }
      }
    }
  }
})

function getSignature() {
  fetch(authEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      meetingNumber: meetingNumber,
      role: role
    })
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    startMeeting(data.signature)
  }).catch((error) => {
  	console.log(error)
  })
}

function startMeeting(signature) {
  client.join({
    signature: signature,
    sdkKey: sdkKey,
    meetingNumber: meetingNumber,
    password: passWord,
    userName: userName,
    userEmail: userEmail,
    tk: registrantToken,
    zak: zakToken
  })
}
