$(document).ready(function() {
		
			var cat='';
			var ser='';
			var trad1='';
			var result={
				etape1:[],
				etape2:[],
				etape3:[],
				etape4:[],
				etape5:[],
				etape6:[],
				etape7_1:[],
				etape7_2:[],
				etape7_3:[]
			};
		
			$( "#regForm" ).submit(function( event ) {
				event.preventDefault();
				$(".etape7").hide();
				//console.log($('#regForm').serialize());
				ser=$('#regForm').serialize();
				trad1=ser.split("&");
				traduction();
				console.log(result);
				
			});
			
			function traduction(){
			//console.log(trad1);
				for(var i=0;i<trad1.length;i++){
					var temp= trad1[i].split("=");
					switch(temp[0]){
							
						case "etape2":
						case "etape3":
						case "etape4":
							var arr=[];
							for(var j=0;j<formData[temp[0]][cat].length;j++){
								if(formData[temp[0]][cat][j].id==temp[1]){
									result[temp[0]].push(formData[temp[0]][cat][j].lib);
									break;
								}
							}
							break;
						
						case "etape1":
						case "etape5":
						case "etape6":
						case "etape7_1":
						case "etape7_2":
							for(var j=0;j<formData[temp[0]].length;j++){
								if(formData[temp[0]][j].id==temp[1]){
									result[temp[0]].push(formData[temp[0]][j].lib);
									break;
								}
							}
							break;
							
						case "etape7_3":
							result[temp[0]].push(temp[1]);
							break;
						
						
					}
					
					
				}
				
				$.ajax({
					method: 'POST',
					url: 'http://localhost:8000/sendingData',
					data: result,
					success: function(data) {
						console.log("DATA SENT");
						console.log(data);
						///que faire avec les données ????
						data.forEach(function(h) {
							//afficher l'hébergement h
							//ajouter le marqueur sur la carte
						});
					},
					error: function(a,errorCode, errorThrown) {
						//pendant le dev.
					}
				});
			}
			
			
			function etape1(){
				
				$(".etape1").append("<h3>Type d'hébergement</h3>");

				var div=$("<div class='form-check form-check-inline'>");
				for(var i=0;i<formData.etape1.length;i++){
					div.append("<input  class='form-check-input' type='radio' id='inlineRadio"+i+"' name='etape1' value="+formData.etape1[i].id+">");
					div.append("<label  class='form-check-label' for='inlineRadio"+i+"'>"+formData.etape1[i].lib+"</label>");
				}
				
				$(".etape1").append(div);
				
				$(".etape1").append("<input type='button' class='btn btn-primary' id='etape1' value='Suivant'>");

				$("#etape1").click(function(){
					cat=$("input[name='etape1']:checked").val();
					$(".etape1").hide();
					etape2();
				});
			}

			function etape2(){
				$(".etape2").show();

				$(".etape2").append("<h3>Catégorie de l'hébergement</h3>");

				var div=$("<div class='form-check form-check-inline'>");
				for(var i=0;i<formData.etape2[cat].length;i++){
					div.append("<input  class='form-check-input' type='checkbox' id='inlineCheckbox"+i+"' name='etape2' value="+formData.etape2[cat][i].id+">");
					div.append("<label  class='form-check-label' for='inlineCheckbox"+i+"'>"+formData.etape2[cat][i].lib+"</label>");
				}
				
				$(".etape2").append(div);
				
				$(".etape2").append("<input type='button' class='btn btn-primary' id='etape2' value='Suivant'>");

				$("#etape2").click(function(){
					$(".etape2").hide();
					if(cat=='h1'){
						etape5();
					}else{
						etape3();
					}
				});
			}
			
			
			function etape3(){
				$(".etape3").show();

				if(cat=='c1'){
					$(".etape3").append("<h3>Vous souhaitez dormir en :</h3>");
				}else{
					$(".etape3").append("<h3>Nombre de personnes :</h3>");
				}

				var div=$("<div class='form-check form-check-inline'>");
				for(var i=0;i<formData.etape3[cat].length;i++){
					div.append("<input  class='form-check-input' type='checkbox' id='inlineCheckbox"+i+"' name='etape3' value="+formData.etape3[cat][i].id+">");
					div.append("<label  class='form-check-label' for='inlineCheckbox"+i+"'>"+formData.etape3[cat][i].lib+"</label>");
				}
				
				$(".etape3").append(div);
				
				$(".etape3").append("<input type='button' class='btn btn-primary' id='etape3' value='Suivant'>");

				$("#etape3").click(function(){
					$(".etape3").hide();
					etape4();
				});
			}

			function etape4(){
				$(".etape4").show();

				if(cat=='c1'){
					$(".etape4").append("<h3>Services disponibles dans votre Camping :</h3>");
				}else{
					$(".etape4").append("<h3>Nombre de chambres :</h3>");
				}


				var div=$("<div class='form-check form-check-inline'>");
				for(var i=0;i<formData.etape4[cat].length;i++){
					div.append("<input  class='form-check-input' type='checkbox' id='inlineCheckbox"+i+"' name='etape4' value="+formData.etape4[cat][i].id+">");
					div.append("<label  class='form-check-label' for='inlineCheckbox"+i+"'>"+formData.etape4[cat][i].lib+"</label>");
				}
				
				$(".etape4").append(div);
				
				$(".etape4").append("<input type='button' class='btn btn-primary' id='etape4' value='Suivant'>");

				$("#etape4").click(function(){
					$(".etape4").hide();
					etape5();
				});
			}

			function etape5(){
				$(".etape5").show();

				$(".etape5").append("<h3>Confort :</h3>");

				var div=$("<div class='form-check form-check-inline'>");
				for(var i=0;i<formData.etape5.length;i++){
					div.append("<input  class='form-check-input' type='checkbox' id='inlineCheckbox"+i+"' name='etape5' value="+formData.etape5[i].id+">");
					div.append("<label  class='form-check-label' for='inlineCheckbox"+i+"'>"+formData.etape5[i].lib+"</label>");
				}
				
				$(".etape5").append(div);
				
				$(".etape5").append("<input type='button' class='btn btn-primary' id='etape5' value='Suivant'>");

				$("#etape5").click(function(){
					$(".etape5").hide();
					etape6();
				});
			}

			function etape6(){
				$(".etape6").show();

				$(".etape6").append("<h3>Équipements :</h3>");

				var div=$("<div class='form-check form-check-inline'>");
				for(var i=0;i<formData.etape6.length;i++){
					div.append("<input  class='form-check-input' type='checkbox' id='inlineCheckbox"+i+"' name='etape6' value="+formData.etape6[i].id+">");
					div.append("<label  class='form-check-label' for='inlineCheckbox"+i+"'>"+formData.etape6[i].lib+"</label>");
				}
				
				$(".etape6").append(div);
				$(".etape6").append("<button type='submit' class='btn btn-primary'>Submit</button>");
				/*$(".etape6").append("<button type='button' class='btn btn-danger'>Recommencer</button>");*/
				

				
				/*$("#regForm").append("<input type='submit' id='btn1'>");*/

				/*$("#etape6").click(function(){
					$(".etape6").hide();
					etape7();
				});*/
			}

			function etape7(){
				$(".etape7").show();

				$(".etape7").append("<p>Département :</p>");

				for(var i=0;i<formData.etape7_1.length;i++){
					$(".etape7").append("<input type='checkbox' name='etape7_1' value="+formData.etape7_1[i].id+">"+formData.etape7_1[i].lib+"<br>");
				}

				$(".etape7").append("<p>Autres Options :</p>");

				for(var i=0;i<formData.etape7_2.length;i++){
					$(".etape7").append("<input type='checkbox' name='etape7_2' value="+formData.etape7_2[i].id+">"+formData.etape7_2[i].lib+"<br>");
				}

				$(".etape7").append("<p>Ville :</p>");

				$(".etape7").append("<input type='text' name='etape7_3'><br>");

				$("#regForm").append("<input type='submit' id='btn1'>");
			}

			etape1();
			
			$("#div").hide();
			$("#Act").hide();
		var cities = L.featureGroup();
		var r = [];
			function notation_stars(nb){
				var cat = nb.split(" ")[0];
				console.log(cat);
				$(".rating").html("");
				$(".rating").append(cat);
				for (i=1;i<=5;i++){
					if (i<=cat){
					$(".rating").append("<i>"+"<img src='Icons_markers/stars_complet.png' style='padding:5px;'>"+"</i>");
					}
					else if ((i-nb)==0.5){
							$(".rating").append("<i>"+"<img src='Icons_markers/stars_semi.png' style='padding:5px;'>"+"</i>");
						
						}else{
							$(".rating").append("<i>"+"<img src='Icons_markers/stars.png' style='padding:5px;'>"+"</i>");
						}
						
					}
					
				};
			
			function info(val){
				var nom = val.fields.nomoffre;
				var adresse = val.fields.adresse2;
				var categorie = val.fields.categorie;
				var codepostal = val.fields.codepostal;
				var tel = val.fields.commtel;
				var siteweb = val.fields.commweb;
				if (typeof categorie == 'undefined'){
					categorie = "0";
				}
				notation_stars(categorie);
				if (typeof siteweb == 'undefined'){
					siteweb = "Pas de site web";
				}
				$("#hd").html("");
				$("#pd").html("");
				$("#hd").append("<b>"+nom+"<b>");
				$("#pd").append("<img src='Icons_markers/marqueur.png' style='padding:5px;'>"+adresse+" "+codepostal+"<br>");
				$("#pd").append("<img src='Icons_markers/site_web.png' style='padding:5px;'>"+siteweb+"<br>");
				$("#pd").append("<img src='Icons_markers/tel.png' style='padding:5px;'>"+tel+"<br>");
				
				
				
				
			};
		function find (d,s){
				var o =[];
				for (j=0;j<d.length;j++){
					if (d[j].fields.nomoffre == s){
						o.push(d[j]);}
				}
				return o[0];
			}
		function layer(val){
			for (i=0;i<val.length;i++){
				var nom = val[i].fields.nomoffre;
				var coor = val[i].geometry.coordinates;
				var coor2 = [coor[1],coor[0]];
				var popup = L.popup().setContent(nom);
				var type = L.marker(coor2).bindPopup(popup).addTo(cities);
				}
				console.log(cities);
			}
var acts_aut = [];	
var degus_aut =[];
var pat_aut = [];		
var data_gra =[];
		function find_act(lat,lng,act,acts_autour){
			for (i=0;i<act.length;i++){
				var coor = act[i].geometry.coordinates;
				var coor2 = [coor[1],coor[0]];
				if ((coor2[0]<lat[1] && coor2[0]>lat[0]) && (coor2[1]>lng[1] && coor2[1]<lng[0])){
					acts_autour.push(act[i]);
				
			}
			}		
			
}
function graphique(longu){
		new Chart(document.getElementById("bar-chart"), {
			type: 'bar',
			data: {
			labels: ['Patrimoine','Dégustations','Activités'],
			  datasets: [
				{
				  label: "Activités",
				  backgroundColor: ["red","blue","green"],
				  data: longu
				}				
			  ]
			},
			options: {
			  legend: { display: true },
			  title: {
				display: true,
				text: 'Activités autours'
			  }
			}
		});


}	
function activites (lats,lngs) {

		$.getJSON('activites.json',function(data1){
		var acts = []
		
		function database(){
		for (i=0;i<data1.length;i++){
		acts.push(data1[i].fields["nomoffre"]);}
		};
		database();
		find_act(lats,lngs,data1,acts_aut);
		console.log(acts_aut);
		data_gra.push(acts_aut.length);
		console.log("activités",acts);
		
		});
		$.getJSON('degustations.json',function(data2){
		var degus = []
		function database(){
			for (i=0;i<data2.length;i++){
			degus.push(data2[i].fields["nomoffre"]);}
		};
		database();
		find_act(lats,lngs,data2,degus_aut);
		console.log(degus_aut);
		data_gra.push(degus_aut.length);
		console.log("degustations",degus);
		});
		$.getJSON('patrimoine.json',function(data3){
		var pat = []
		function database(){
			for (i=0;i<data3.length;i++){
			pat.push(data3[i].fields["nomoffre"]);}
		};
		database();
		find_act(lats,lngs,data3,pat_aut);
		console.log(pat_aut);
		data_gra.push(pat_aut.length);
		console.log("patrimoine",pat);
		});
		graphique(data_gra);
		
		
}

function hotel(cities){
				////////////////////////////////////////////////////
			$.getJSON('hôtel.json',function(data){
		r = [];
		function database(){
		for (i=0;i<data.length;i++){
					r.push(data[i]);}
		};
		database();
		///////////////////////////////////////////////////
			//Request 
		function salut(d,c,fil){
			r = [];
			for (i=0;i<d.length;i++){
				for (j=0;j<c.length;j++){
					if (d[i].fields[fil] == c[j]){
						r.push(d[i]);
					} 
				}
			}
			
			console.log("salut",r);
			}
			
			
			function layer(id,val,Icon){
			for (i=0;i<val.length;i++){
				var nom = val[i].fields.nomoffre;
				var coor = val[i].geometry.coordinates;
				var coor2 = [coor[1],coor[0]];
				var popup = L.popup().setContent(nom);
				var type = L.marker(coor2,{icon: Icon}).bindPopup(popup).addTo(cities);
				}
				console.log(cities);
			}

			
			$("#checkBox1").change(function(){
			if($(this).is(':checked')) {
				cities.clearLayers();
				var valeur = $(this).val();
				var id = valeur ;
				var val = data;
				var Icon = L.icon({
				iconUrl: 'Icons_markers/'+valeur+'.png',
				iconSize:     [18, 25]
				});
				layer(id,val,Icon); 
				}
			});
			
			
});		
};

function camping(cities){
			////////////////////////////////////////////////////
			$.getJSON('campings.json',function(data){
		r = [];
		function database(){
		for (i=0;i<data.length;i++){
					r.push(data[i]);}
		};
		database();
			///////////////////////////////////////////////////
			//Request 
		function salut(d,c,fil){
			r = [];
			for (i=0;i<d.length;i++){
				for (j=0;j<c.length;j++){
					if (d[i].fields[fil] == c[j]){
						r.push(d[i]);
					} 
				}
			}
			
			console.log("salut",r);
			}
			
			function layer(id,val,Icon){
			for (i=0;i<val.length;i++){
				var nom = val[i].fields.nomoffre;
				var coor = val[i].geometry.coordinates;
				var coor2 = [coor[1],coor[0]];
				var popup = L.popup().setContent(nom);
				var type = L.marker(coor2,{icon: Icon}).bindPopup(popup).addTo(cities);
				}
				console.log(cities);

			}

			
			$("#checkBox2").change(function(){
			if($(this).is(':checked')) {
				cities.clearLayers();
				var valeur = $(this).val();
				var id = valeur ;
				var val = r;
				var Icon = L.icon({
				iconUrl: 'Icons_markers/'+valeur+'.png',
				iconSize:     [18, 25]
				});
				layer(id,val,Icon); 
				}
			});
			
			

			
});		
};

function locatif(cities){
			////////////////////////////////////////////////////
			$.getJSON('locatif.json',function(data){
			var filtre = "type"; 
			var filtre2 ="capacitenbchambres";
			r = [];
			
			///////////////////////////////////////////////////
			//Request 
		function salut(d,c,fil){
			r = [];
			for (i=0;i<d.length;i++){
				for (j=0;j<=c.length;j++){
					if (d[i].fields[fil] == c[j]){
						r.push(d[i]);
						
					} 
				}
			}
			console.log("salut",r);
			}
			
			salut(data,["Meublés"],"type");
			
			
			
			function layer(val){
			for (i=0;i<val.length;i++){
				var nom = val[i].fields.nomoffre;
				var coor = val[i].geometry.coordinates;
				var valeur = val[i].fields.typehabitation;
				var rel ;
				if (typeof valeur == 'undefined'){
					rel = "undefined";
				}else{
				rel = valeur.split(",")[0];
				}
				var coor2 = [coor[1],coor[0]];
				var Icon = L.icon({
				iconUrl: 'Icons_markers/'+rel+'.png',
				iconSize:     [18, 25]
				});
				var popup = L.popup().setContent(nom);
				var type = L.marker(coor2,{icon: Icon}).bindPopup(popup).addTo(cities);
				}
				console.log(cities);

			}
			layer(r);

			salut(r,[4],"capacitenbchambres");
			cities.clearLayers();
			
			layer(r);
			Cat = r ;

});		
};


			cities.on("click", function (event) {
					var clickedMarker = event.layer;
					console.log("marker",clickedMarker);
					console.log("r",r);
					var sss = find(r,clickedMarker._popup._content);
					$("#div").show();
					info(sss);
					macarte.setView([event.latlng.lat, event.latlng.lng+0.4], 10);
					var lats = [event.latlng.lat-0.2,event.latlng.lat+0.2];
					var lngs = [event.latlng.lng+0.5,event.latlng.lng-0.5];
					activites(lats,lngs);
					
					
			})
			


	$('input[name=Choix1]').change(function(){
    if($(this).is(':checked')) {
        	cities.clearLayers();
			locatif(cities);
    } else {
        cities.clearLayers();
    }
});

	$('input[name=Choix2]').change(function(){
    if($(this).is(':checked')) {
        	cities.clearLayers();
			hotel(cities);
    } else {
        cities.clearLayers();
    }
});

	$('input[name=Choix3]').change(function(){
    if($(this).is(':checked')) {
        	cities.clearLayers();
			camping(cities);
    } else {
        cities.clearLayers();
    }
});

	$('input[name=Description]').click(function(){
		if ($(this).disabled ){
		}
		else{
			$(this).css("background-color","black");
			$(this).css("color","white");
			$(this).css("border-color","black");
			$('input[name=Activités]').removeAttr("disabled");
			$('input[name=Activités]').css("background-color","white");
			$('input[name=Activités]').css("color","black");
			$('input[name=Activités]').css("border-color","black");
			$(this).attr("disabled","disabled");
			$("#Des").show();
			$("#Act").hide();
		}
	});
	
		$('input[name=Activités]').click(function(){
		if ($(this).disabled ){
		}
		else{
			$(this).css("background-color","black");
			$(this).css("color","white");
			$(this).css("border-color","black");
			$('input[name=Description]').removeAttr("disabled");
			$('input[name=Description]').css("background-color","white");
			$('input[name=Description]').css("color","black");
			$('input[name=Description]').css("border-color","black");
			$(this).attr("disabled","disabled");
			$("#Des").hide();
			$("#Act").show();
		}
	});
	

			// On initialise la latitude et la longitude de Paris (centre de la carte)
			var lat = 47.361903;
			var lon = -0.861994;
			var macarte = null;
			// Fonction d'initialisation de la carte
				var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
				'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
				
				var fond = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                    // Il est toujours bien de laisser le lien vers la source des données
                    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                    minZoom: 1,
                    maxZoom: 40
                })
				
				var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
					streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});
				
				var baseLayers = {
					"Fond" : fond
				};
				var overlays = {
					"Cities": cities
					
				}
				// Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
                macarte = L.map('map',{
					center: [lat, lon],
					zoom: 8,
					layers: [fond,cities]
				});
				L.control.layers(baseLayers,overlays).addTo(macarte);
			
});