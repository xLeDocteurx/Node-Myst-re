let express = require('express');
let bodyparser = require('body-parser');
let bb = require('express-busboy');

let webPort = 8080;
let app = express();

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));
// app.use(bodyparser.urlencoded({ extended: false }));

let x = [Date.now()];
x = x.toString().split('');
x = x[x.length - 2];

let i = 3;
let v = 'Pas encore de resultat';
app.get('/', function (req, res) {
	// res.setHeader('Content-Type', 'text/html');
	res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
	res.write(`<!DOCTYPE html>
				<html lang="en">

				<head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<meta http-equiv="X-UA-Compatible" content="ie=edge">
					<title>Far Worst Mystery Number</title>

					<link rel="shortcut icon" type="image/png" href="favicon.png">

					<!-- <script src="https://cdn.firebase.com/libs/firebaseui/2.5.1/firebaseui.js"></script> -->
					<!-- <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/2.5.1/firebaseui.css" /> -->

					<link rel="stylesheet" href="bootstrap/css/bootstrap.css">
					<link rel="stylesheet" href="style.css">

				</head>
				<body class="bg-secondary">
					<div id="main_container" class="cover-container-fluid d-flex h-100 p-3 mx-auto flex-column">

					<!-- <header class="mb-auto"> -->
					<!-- <header class="fixed-top">
						<nav class="navbar navbar-expand navbar-dark bg-dark p-0">
							<h1 class="navbar-brand mx-3">Far Worst Chat</h1>
						</nav>
					</header> -->
					<header class="fixed-top">
						<nav class="navbar d-flex justify-content-end navbar-expand navbar-dark bg-dark p-1">
							<a id="navbar-brand" class="navbar-brand ml-auto mr-3" href="/">Far Worst Mystery Number</a>
						</nav>
					</header>


					<hr class="mt-5">
					<div id="" class="row mx-auto mt-5">
						<form method="post" action="/">
							<input type="number" min="0" max="9" name="number">
							<input type="submit" value="Valider">
						</form>
					</div>

					<div id="" class="row mx-auto mt-1">
						${i} essais restants
					</div>	

					<div class="row mt-3">
						<div id="card" class="card bg-dark mx-auto p-5">
								<div class="row mx-auto mt-1">
									<b>Indice :</b>
								</div>
								<div class="row mx-auto">
									<div>${v}</div>            
								</div>
								` +
								// <div id="" class="row mx-auto mt-1">
								// 	Chosen number : ${x}
								// </div>
								`	
						</div>
					</div>	

					<footer class="fixed-bottom d-flex justify-content-center bg-secondary p-2">
						<input id="content_input" class="w-75" type="text" onchange="post_message()">
						<button id="content_button" class="btn btn-dark" onclick="post_message()">Send</button>
					</footer>
					

					</div>
					
					<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
						crossorigin="anonymous"></script>
					<script src="jquery.js"></script>
					<script src="bootstrap/js/bootstrap.js"></script>
					<script src="p5/p5.js"></script>
					<script src="p5/addons/p5.dom.js"></script>
					
					<script src="scripts.js"></script>
				  
				</body>
				  
			</html>
		`);
});

bb.extend(app)

app.post('/', function (req, res) {

	function retrieve() {
		let b = req.body.number;
		if (b == x) {
			v = 'Trouvé ! Bien joué à toi !'
			i = 3
		} if (b < x) {
			i--
			v = 'C\'est plus'
		} if (b > x) {
			i--
			v = 'C\'est moins !'
		}
		if (i == 0) {
			v = 'Vous avez perdu'
			i = 3
		};
		res.redirect('/')
	}
	retrieve();
});

app.use(function (req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
});

app.listen(process.env.PORT || webPort);
