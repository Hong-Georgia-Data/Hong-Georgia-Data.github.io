var url = "samples.json";

// function unpack(rows, index) {
//   return rows.map(function(row) {
//     return row[index];
//   });
// }

d3.selectAll("#selDataset").on("change", getfulldata);

function getfulldata() {
  d3.json(url).then(function(data) {
  console.log(data);
  const metadata = data[0].metadata;
  console.log(metadata);

  const samples = data[0].samples;
  console.log(samples);

  let otu_list = [];
  let otu_label_list = [];
  let sample_va_list = [];
  let idlist = [];
  
  for (let i = 0; i <samples.length ; i++) {  
    idlist.push(samples[i].id);
                                }
    console.log(idlist);
    // var selected_id;
    /////addropdoem
    var Adddropdown = d3.select("select")
                            .selectAll("#selDataset")
                            // .append("g")
                            .data(idlist)
                            .enter()
                            .append("option","option")
                            .attr("value", d =>d)
                            // .on("change", getfulldata)
                            .text(d => d)

                            .exit();
    var dropdownMenu = d3.select("#selDataset");
    var selected_id = dropdownMenu.property("value");
    console.log(selected_id);


    let selected_data = [];
    let selected_meta =[];

    // function getData() {
     for (j = 0; j <samples.length ; j++) {  
            if (samples[j].id === selected_id){selected_data.push(samples[j]);}
                        }   
     for (j = 0; j <metadata.length ; j++) {  
                            if (metadata[j].id === parseInt(selected_id)){selected_meta.push(metadata[j]);}
                                        }   
    console.log(selected_meta);

   // the sample data is already PRESORTED

     console.log(selected_data.slice(0, 10));
   

    //  let sorted_data= selected_data.sort();
    //  console.log(sorted_data);


     for (let i = 0; i <selected_data.length ; i++) {  
        otu_list.push(selected_data[i].otu_ids);
        otu_label_list.push(selected_data[i].otu_labels);
        sample_va_list.push(selected_data[i].sample_values);
     }

    let use_otulist = otu_list[0].slice(0, 10);
    let use_sample = sample_va_list[0].slice(0, 10);
    let use_otulabel= otu_label_list[0].slice(0, 10);
    //  console.log(sample_va_list[0].slice(0, 10));
     console.log(use_sample);    
     let use_otuid = [];
     for (let i = 0; i <use_otulist.length ; i++) { 
         use_otuid.push("OTU " + use_otulist[i]);
     }
    console.log(use_otuid);
    console.log(use_otulabel);

////Bar Chart
     var trace1 = {
        type: "bar",
        
        y: use_otuid,
        x: use_sample,
        text: use_otulabel,
        orientation: 'h',

      };
  
      var bar_data = [trace1];
  
      Plotly.newPlot("bar", bar_data);
 // Bubble Chart 
    var trace2 = {
    x: otu_list[0],
    y: sample_va_list[0],
    mode: 'markers',
    text: otu_label_list[0],
    marker: {
      color: otu_list[0],
      size: sample_va_list[0],
    },
    type: 'scatter'
  };
  var layout_bub = {
    title: 'Bubble Chart Size Scaling',
    showlegend: false,
    height: 600,
    width: 1200
  };

  var bub_data = [trace2];
  Plotly.newPlot("bubble", bub_data,layout_bub);


  /////Demographic
//   <div id="sample-metadata" class="panel-body"></div>

    // var demo_text

    // function demodata(){
    var demo_text= d3.select(".panel-body").selectAll("div").remove()

    var demo_text= d3.select(".panel-body")
                        // .selectAll("div")
                        // .remove()
                        .append("div")
                          .text("ID:" + selected_meta[0].id)
                          .append("div")
                          .text("Ethnicity:" + selected_meta[0].ethnicity)
                          .append("div")
                          .text("Age:" + selected_meta[0].age)
                          .append("div")
                          .text("gender:" + selected_meta[0].gender)
                          .append("div")
                          .text("location:" + selected_meta[0].location)
                          .append("div")
                          .text("bbtype:" + selected_meta[0].bbtype)
                          .append("div")
                          .text("wfreq:" + selected_meta[0].wfreq);
                        // }



 
  }
  );
}

getfulldata();


// function buildPlot() {
//   d3.json(url).then(function(data) {
//   console.log(data[0].samples);
//   const samples = data[0].samples;
//   console.log(samples[0])
//   console.log(samples[0].otu_ids)

//     var otuid_list= [];    
//     var label_list= [];
//     var samva_li= [];

//   for (var i = 0; i <samples.length ; i++) {  
//     const otuid_sin = samples[i].otu_ids;
//     const samva_sin = samples[i].sample_values;
//     const label_sin = samples[i].otu_labels;
//     //get the outu oid
//     for (let j = 0; j <otuid_sin.length ; j++){
//     otuid_list.push(otuid_sin[j])
// //get the label values
   
//     label_list.push(label_sin[j])
// //get the sample values
//     samva_li.push(samva_sin[j])


//     ///
//   }    
//     console.log(otuid_list);
//     console.log(label_list);
//     console.log(samva_li);


//   });
// }

// buildPlot();