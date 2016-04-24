var app = {
	modal: null,
	db: null,
	profile: {},
	months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	initialize: function () {
		document.addEventListener('deviceready', this.onDeviceReady);
		//document.addEventListener('DOMContentLoaded', this.onDeviceReady);
	},
	onDeviceReady: function () {
		console.log("device is ready");
		app.modal = window.modal;
		document.querySelector("#menu").addEventListener("click", app.navigate);
		document.getElementById("madlibLink").addEventListener("click", app.navigate);
		document.getElementById("btnScan").addEventListener("click", app.scan);
		document.getElementById("btnEdit").addEventListener("click", app.showWizard);

		history.replaceState({
			"page": "profile"
		}, null, "#profile");
		document.querySelector("[data-href=profile]").click();
		window.addEventListener("popstate", app.popPop);


		console.log("test the sqlitePlugin");
		window.sqlitePlugin.echoTest(function () {
			alert("sqlite plugin supported");
		}, function () {
			alert("sqlite plugin NOT supported");
		});
		console.log("set up DB");
		app.setupDB();

	},
	navigate: function (ev) {
		ev.preventDefault();
		//the ul is the currentTarget, the target could be <li>, <a>, or <i>
		//we need to access the data-href from the anchor tag
		var ct, tagname, id, pages, tabs;
		ct = ev.target;
		tagname = ct.tagName.toLowerCase();
		//console.log("tagname " + tagname);
		if (tagname == 'a') {
			id = ct.getAttribute("data-href");
		} else if (tagname == 'i') {
			id = ct.parentElement.getAttribute("data-href");
		} else {
			//li
			if (ct.hasAttribute("data-href")) {
				id = ct.getAttribute("data-href");
			} else {
				id = ct.querySelector("a").getAttribute("data-href");
			}
		}
		//add to history
		history.pushState({
			"page": id
		}, null, "#" + id);
		//switch the page view
		pages = document.querySelectorAll("[data-role=page]");
		tabs = document.querySelectorAll("#menu li");
        [].forEach.call(pages, function (item, index) {
			item.classList.remove("active-page");
			if (item.id == id) {
				item.classList.add("active-page");
			}
		});
        [].forEach.call(tabs, function (item, index) {
			item.classList.remove("active-tab");
			if (item.querySelector("a").getAttribute("data-href") == id) {
				item.classList.add("active-tab");
			}
		});
		if (id == "contacts") {
			console.log("get contacts list ready");
			//call the fetch contacts page
			fetchContacts();
		}
		if (id == "scan") {
			console.log("get profile ready and qr code");
			//call the fetch profile function
			app.fetchProfile();
		}
		if (id == "madlib") {
			//load the madlib story for the contact
			var contact = ct.getAttribute("data-id");
			// call the load story function
			app.loadStory(contact_id);

		}
	},
	setupDB: function () {
		//connect to the db, create the tables, load the profile if one exists, create the QRcode from the profile 
		console.log("about to openDatabase");
		app.db = sqlitePlugin.openDatabase({
				name: 'DBmeetcute.2',
				iosDatabaseLocation: 'default'
			},
			function (db) {
				//set up the tables
				console.log("create the tables IF NOT EXISTS");
				db.transaction(function (tx) {
					tx.executeSql('CREATE TABLE IF NOT EXISTS profile(item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name TEXT, item_value TEXT)');
					tx.executeSql('CREATE TABLE IF NOT EXISTS madlibs(madlib_id INTEGER PRIMARY KEY AUTOINCREMENT, full_name TEXT, madlib_txt TEXT)');
				}, function (err) {
					console.log("error with the tx trying to create the tables. " + JSON.stringify(err));
				});

				//now go get the profile info for home page
				app.fetchProfile();
			},
			function (err) {
				console.log('Open database ERROR: ' + JSON.stringify(err));
			});
	},
	saveProfile: function (db) {
		//called by clicking on the LAST button in the modal wizard
		console.log("save Profile");
		//save all the info from the modal into local variables
		var name = document.getElementById("txtName").value;
		var email = document.getElementById("txtEmail").value;
		var gender = document.getElementById("txtSex").value;
		var beverage = document.getElementById("txtBeverage").value;
		var food = document.getElementById("txtFood").value;
		var clothing = document.getElementById("txtClothing").value;
		var time = document.getElementById("txtTimeOfDay").value;
		var social = document.getElementById("txtSocial").value;
		var transport = document.getElementById("txtTransport").value;
		var number = document.getElementById("txtNumber").value;
		var facial = document.getElementById("txtFacial").value;

		var output = name + ";" + email + ";" + gender + ";" + beverage + ";" + food + ";" + clothing + ";" + time + ";" + social + ";" + transport + ";" + number + ";" + facial + ";";
		console.log(output);


		//check to ensure the app.db object has been created
		if (app.db == null) {
			app.db = sqlitePlugin.openDatabase({
				name: 'DBmeetcute.2',
				iosDatabaseLocation: 'default'
			});
		}

		app.profile = {};
		//delete current values in profile table
		app.db.executeSql('DELETE FROM profile', []);

		app.db.transaction(function (tx) {
			console.log("saving profile data");
			//insert all the new info from modal into profile table

			tx.executeSql('INSERT INTO profile(item_name, item_value) VALUES(?,?)', ['full_name', name], function () {
				// success
			}, function (e) {
				console.log(e.message);
			});
			tx.executeSql('INSERT INTO profile(item_name, item_value) VALUES(?,?)', ['email', email], function () {
				// success
			}, function (e) {
				console.log(e.message);
			});
			tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES(?,?)', ['gender', gender], function () {
				// success
			}, function (e) {
				console.log(e.message);
			});
			tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES(?,?)', ['beverage', beverage], function () {
				// success
			}, function (e) {
				console.log(e.message);
			});
			tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES(?,?)', ['food', food], function () {
				// success
			}, function (e) {
				console.log(e.message);
			});
			tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES(?,?)', ['clothing', clothing], function () {
				// success
			}, function (e) {
				console.log(e.message);
			});
			tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES(?,?)', ['time', time], function () {
				// success
			}, function (e) {
				console.log(e.message);
			});
			tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES(?,?)', ['social', social], function () {
				// success
			}, function (e) {
				console.log(e.message);
			});
			tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES(?,?)', ['transport', transport], function () {
				// success
			}, function (e) {
				console.log(e.message);
			});
			tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES(?,?)', ['number', number], function () {
				// success
			}, function (e) {
				console.log(e.message);
			});

			tx.executeSql('INSERT INTO profile (item_name, item_value) VALUES(?,?)', ['facial', facial], function () {
				// success
			}, function (e) {
				console.log(e.message);
			});
		}, function (error) {
			//error
			console.log("failed transaction: adding the profile")
		}, function () {
			//call fetchprofile when done
			app.fetchProfile();
		});

	},
	fetchProfile: function () {
		//fetch all the profile info from profile table
		if (app.db == null) {
			app.db = sqlitePlugin.openDatabase({
				name: 'DBmeetcute.2',
				iosDatabaseLocation: 'default'
			});
		};

		app.db.executeSql('SELECT item_name, item_value FROM profile ORDER BY item_id', [], function (results) {
				var numRows = results.rows.length;
			
				app.profile = {};
				//update app.profile
				for (var i = 0; i < numRows; i++) {
					app.profile[results.rows.item(i).item_name] = results.rows.item(i).item_value;
				}
				app.createQR();
				
				//update home page info based on app.profile
				document.getElementById("name").textContent = "Name:" + app.profile['full_name']; 
				document.getElementById("email").textContent = "Email: " + app.profile['email'];
				document.getElementById("gender").textContent = "Gender pronoun: " + app.profile['gender'];
				document.getElementById("beverage").textContent = "Type of Beverage: " + app.profile['beverage'];
				document.getElementById("food").textContent = "Type of Food: " + app.profile['food'];
				document.getElementById("clothing").textContent = "Clothing: " + app.profile['clothing'];
				document.getElementById("time").textContent = "Time of Day: " + app.profile['time'];
				document.getElementById("social").textContent = "Social Media: " + app.profile['social'];
				document.getElementById("transport").textContent = "Mode of Transport: " + app.profile['transport'];
				document.getElementById("number").textContent = "Favourite Number: " + app.profile['number'];
				document.getElementById("facial").textContent = "Facial Expression: " + app.profile['facial'];
			
			},
			function (error) {
				console.log("failed to fetch resutls for profile" + error.message);
			});
		//generate the new QRCode based on the profile
		


	},
	createQR: function () {
		//build the string to display as QR Code from app.profile
		var str = "";
		for (prop in app.profile) {
			str += app.profile[prop] + ";";
		};
		console.log("QRCODE string: " + str);
		
		//update the QR caode using new QRCode( ) method
		//Link: https://davidshimjs.githun.io/qrcodejs
		document.getElementById("qr").textContent = "";
		var qrcode = new QRCode(document.getElementById("qr"), {
			text: str,
			width: 300,
			height: 300,
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRCode.CorrectLevel.H
		});

	},
	showWizard: function (ev) {
		//call the modal init method 
		modal.init();
	},
	fetchContacts: function () {

		//open the database and query the madlib table
		// if the rows are zero 
		//create a list 
		//madlib_id use the for loop 
		// li set atttribute set href=madlib
		//select all the madlib_id, full_name form madlibs table

		/*  var li = document.createElement("li");   
                    li.innerHTML = '<h3 data-href= contact_id > </h3>';
                    li.addEventListener("click", app.navigate);
                    ul.appendChild(li);
						*/

		//loop through results and build the list for contacts page
		//add click event to each li to call app.navigate
	},
	scan: function (ev) {
		ev.preventDefault();

		//call the plugin barcodeScanner.scan() method
		cordova.plugins.barcodeScanner.scan(function (result) {
				alert("We got a barcode\n" +
					"Result: " + result.text + "\n" +
					"Format: " + result.format + "\n" +
					"Cancelled: " + result.cancelled);
				if (!result.cancelled) {
					//extract the string from the QRCode
					var strQR = result.text;
					var partsQR = strQR.split(";");
					var name = partsQR[0];
					var email = partsQR[1];
					var gender = partsQR[2];
					var beverage = partsQR[3];
					var food = partsQR[4];
					var clothing = partsQR[5];
					var time = partsQR[6];
					var social = partsQR[7];
					var transport = partsQR[8];
					var number = partsQR[9];
					var facial = partsQR[10];
					
					
					//build a madlib by randomly picking a value from app.profile OR data from QRCode
					var date = new Date();
					var today = dat.getDate + " " + app.months[date.getMonth()];

					if (Math.round(Math.random()) == 0) {
						// we are zero
					} else {
						//we are one
					}

				}
			},
			function (error) {
				alert("Scanning failed: " + error);
			}
			
			//generate the mad lib here
											
		);

		if (app.db == null) {
			app.db = sqlitePlugin.openDatabase({
				name: 'DBmeetcute.2',
				iosDatabaseLocation: 'default'
			});
		};
		
		tx.executeSql('INSERT INTO mablibs(full_name, madlib_txt) VALUES(?,?)', [contact_id, name], function () {
				// success
			}, function (e) {
				console.log(e.message);
			});
		//insert the new madlib into the madlibs table (creating a new contact)
		
		
		//new li will be displayed when contact page loads

	},

	loadStory: function (contact_id) {

		//use the contact_id as the madlib_id from madlibs table

		//select the madlib_txt and display as the new madlib

	},
	popPop: function (ev) {
		//handle the back button
		ev.preventDefault();
		var hash = location.hash.replace("#", ""); //history.state.page;
		var pages = document.querySelectorAll("[data-role=page]");
		var tabs = document.querySelectorAll("#menu li");
        [].forEach.call(pages, function (p, index) {
			p.classList.remove("active-page");
			if (p.id == hash) {
				p.classList.add("active-page");
			}
		});
        [].forEach.call(tabs, function (item, index) {
			item.classList.remove("active-tab");
			if (item.querySelector("a").getAttribute("data-href") == hash) {
				item.classList.add("active-tab");
			}
		});
	}

};



var modal = {
	numSteps: 0,
	overlay: null,
	activeStep: 0,
	self: null,
	init: function () {
		console.log("clicked show modal button");
		//set up modal then show it
		modal.self = document.querySelector(".modal");
		modal.overlay = document.querySelector(".overlay");
		modal.numSteps = document.querySelectorAll(".modal-step").length;
		//set up button listeners
		modal.prepareSteps();
		modal.setActive(0);
		modal.show();
	},
	show: function () {
		modal.overlay.style.display = 'block';
		modal.self.style.display = 'block';
	},
	hide: function () {
		modal.self.style.display = 'none';
		modal.overlay.style.display = 'none';
	},
	saveInfo: function () {
		//this function will use AJAX or SQL statement to save data from the modal steps
		window.app.saveProfile();
		//when successfully complete, hide the modal
		//we could hide the modal and leave the overlay and show an animated spinner
		modal.hide();
	},
	setActive: function (num) {
		modal.activeStep = num;
    [].forEach.call(document.querySelectorAll(".modal-step"), function (item, index) {
			//set active step
			if (index == num) {
				item.classList.add("active-step");
			} else {
				item.classList.remove("active-step");
			}
		});
	},
	prepareSteps: function () {
    [].forEach.call(document.querySelectorAll(".modal-step"), function (item, index) {
			//add listener for each button
			var btn = item.querySelector("button");
			btn.addEventListener("click", modal.nextStep);
			//set text on final button to save/complete/close/done/finish
			if (index == (modal.numSteps - 1)) {
				btn.textContent = "Complete"
			}
		});
	},
	nextStep: function (ev) {
		modal.activeStep++;
		if (modal.activeStep < modal.numSteps) {
			modal.setActive(modal.activeStep);
		} else {
			//we are done this is the final step
			console.log("last step");
			modal.saveInfo();
		}
	},
	reset: function () {
		//this could be a function to clear out any form fields in your modal
	}
}

app.initialize();