ZoomMtg.setZoomJSLib('https://source.zoom.us/2.16.0/lib', '/av')

ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

const urlParams = new URLSearchParams(window.location.search);
const meet = urlParams.get('meet');
console.log('*** meet = ', meet);

var meetingNumber = '9630566849';
var passWord = 'qpUK4b';
var userName = 'Organizzatore - Stanza 1';
var role = 1;

if (meet === "1") {
  meetingNumber = '9630566849';
  passWord = 'qpUK4b';
  userName = 'Organizzatore - Stanza 1';
  role = 1;
} else if (meet === "2") {
  meetingNumber = '9630566849';
  passWord = 'qpUK4b';
  userName = 'Partecipante - Stanza 1';
  role = 0;
} else if (meet === "3") {
  meetingNumber = '8035893415';
  passWord = '4Yc8Sm';
  userName = 'Organizzatore - Stanza 2';
  role = 1;
} else if (meet === "4") {
  meetingNumber = '8035893415';
  passWord = '4Yc8Sm';
  userName = 'Partecipante - Stanza 2';
  role = 0;
}

var authEndpoint = 'https://fathomless-badlands-78122-9ef418803988.herokuapp.com/'
var sdkKey = '0NfU5ntyRJCqLaV_ol4pFA'
var userEmail = ''
var registrantToken = ''
var zakToken = ''
var leaveUrl = 'https://servizionline.camcom.it/'

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

  document.getElementById('zmmtg-root').style.display = 'block'

  ZoomMtg.init({
    leaveUrl: leaveUrl,
    success: (success) => {
      console.log(success)
      ZoomMtg.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        passWord: passWord,
        userName: userName,
        userEmail: userEmail,
        tk: registrantToken,
        zak: zakToken,
        success: (success) => {
          console.log(success)
        },
        error: (error) => {
          console.log(error)
        },
      })
    },
    error: (error) => {
      console.log(error)
    }
  })
}
