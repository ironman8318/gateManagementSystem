const Guest = require('../models/model');

const nodemailer = require('nodemailer');
// const sendgrid = require('nodemailer-sendgrid-transport');
var smtpTransport = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	auth: {
		user: '', //Enter your email account
		pass: '' //Enter your password
	}
});


const Nexmo = require('nexmo');
const nexmo = new Nexmo({
	apiKey: '18e2da6c',
	apiSecret: 'bgy4j2zXoYMHiRDy'
});

exports.home = (req, res, next) => {
	res.render('home');
};

exports.getcheckIn = (req, res, next) => {
	res.render('checkIn');
};

exports.postcheckIn = (req, res, next) => {
	var indiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
	const entry = new Guest({
		visitorName: req.body.nameV,
		visitorMobile: req.body.mobileV,
		visitorEmail: req.body.emailV,
		visitorCheckIn: formatAMPM(new Date()),
		visitorCheckOut: null,
		hostName: req.body.nameH,
		hostMobile: req.body.mobileH,
		hostEmail: req.body.emailH,
		date: formatDate(new Date(indiaTime))
	});
	function formatDate(date) {
		var a = date.getDate();
		var b = date.getMonth() + 1;
		var c = date.getFullYear();

		return a + '/' + b + '/' + c;
	}
	function formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}
	entry.save().then((entry) => {
		console.log(entry);
		var mailOptionsCheckIn = {
			to: entry.hostEmail,
			subject: 'You have a visitor',
			html: `<div class="card">
    
				<!-- Card image -->
				<img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap">
			
				<!-- Card content -->
				<div class="card-body">
			
					<!-- Title -->
					<h2 class="card-title"><a>Your visitor's Details</a></h2>
					<!-- Text -->
					<p class="card-text">Meeting with ${entry.visitorName}</p>
					<p class="note note-primary">
						<Strong>Name   </Strong>         ${entry.visitorName}<br>
						<Strong>Date    </Strong>        ${entry.date}<br>
						<Strong>CheckIn Time </Strong>      ${entry.visitorCheckIn}<br>
					
						<Strong>Email  </Strong>        ${entry.visitorEmail}<br>
						<Strong>Mobile  </Strong>       ${entry.visitorMobile}<br>

					<p class="note note-success">
						<Strong>Host Name</Strong> ${entry.hostName}<br>
						<Strong>Host Email</Strong> ${entry.hostEmail}<br>
						<Strong>Host Mobile</Strong>  ${entry.hostMobile}<br>
					</p>
					<!-- Button -->
				
				</div>
			
			</div>`
		};

		smtpTransport.sendMail(mailOptionsCheckIn, function(error, response) {
			if (error) {
				console.log(error);
			}
			else {
				console.log('Message sent: ' + response.message);
			}
		});

		// transporter.sendMail({
		res.redirect('/');
		// 	from: 'gateentry@company.com',
		// 	to: entry.hostEmail,
		// 	subject: 'You have a visitor',
		// 	html: '<h1>it worked </h1>'
		// });
	});
};

exports.getcheckOut = (req, res, next) => {
	Guest.find({}).sort('visitorCheckIn').then((resq) => {
		// console.log(resq);

		res.render('checkOut', { guests: resq });
	});
};

exports.postcheckOut = (req, res, next) => {
	let id = req.body.leavingGuest;
	Guest.findById(id)
		.then((guest) => {
			var indiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
			guest.visitorCheckOut = formatAMPM(new Date(indiaTime));
			guest.checkedOut = true;
			guest.save().then((entry) => {
				console.log(entry.visitorName + ' checked Out');

				var mailOptionsCheckOut = {
					to: entry.visitorEmail,
					subject: 'Your Visit Report',
					html: `<div class="card">
    
						<!-- Card image -->
						<img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap">
					
						<!-- Card content -->
						<div class="card-body">
					
							<!-- Title -->
							<h2 class="card-title"><a>Your Visit Report</a></h2>
							<!-- Text -->
							<p class="card-text">Meeting with ${entry.hostName}</p>
							<p class="note note-primary">
								<Strong>Name   </Strong>         ${entry.visitorName}<br>
								<Strong>Date    </Strong>         ${entry.date}<br>
								<Strong>CheckIn Time </Strong>      ${entry.visitorCheckIn}<br>
								<Strong>CheckOut Time </Strong>    ${entry.visitorCheckOut}<br></p>
								<Strong>Email  </Strong>        ${entry.visitorEmail}<br>
								<Strong>Mobile  </Strong>       1${entry.visitorMobile}<br>

							<p class="note note-success">
								<Strong>Host Name</Strong> ${entry.hostName}<br>
								<Strong>Host Email</Strong> ${entry.hostEmail}<br>
								<Strong>Host Contact</Strong>  ${entry.hostMobile}<br>
							</p>
							<!-- Button -->
						
						</div>
					
					</div>`
				};
				smtpTransport.sendMail(mailOptionsCheckOut, function(error, response) {
					if (error) {
						console.log(error);
					}
					else {
						console.log('Message sent: ' + response.message);
					}
				});
				res.redirect('back');
			});
		})
		.catch((err) => console.log(err));
	function formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}
};
