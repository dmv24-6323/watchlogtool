$(function () {
    bsCustomFileInput.init();
    $('.select2').select2();
});

//var ipmArray = [];
/*$.getJSON("config.json", function(json) {
    console.log(json); // this will show the info it in firebug console
});*/
/*fetch('./config.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  
    })
    .then(data => console.log(data))  
    .catch(error => console.error('Failed to fetch data:', error));*/


var arrList = [];
var errList = [];
var filterList = [];
var essList = [];
var audioEQList = [];
var audioSettings = [];
var variantList = [];
var speakerFailureList = [];
var tbody = "";
var json_data;

$(document).on("change", "#filter", function(ev){
    $("#srchcnt").text("0 hit(s)");
    $("#srchcnt").css({"display":"none"});
    filterList = [];
    var val = $('#filter').val();
    var tbody_filt = "";
    //console.log(val.length);

    for(var i=1; i < arrList.length; i++){
        for(var j=0; j < val.length; j++){
            if(val[j] == arrList[i][6]){
                filterList.push(arrList[i]);
            }
        }
    }

    if(val.length > 0 && filterList.length > 0){
        for(var i=0; i < filterList.length; i++){
            tbody_filt += '<tr>';
            tbody_filt += '<td>'+ filterList[i][2] +'</td>'; /* Timestamp */
            tbody_filt += '<td>'+ filterList[i][4] +'</td>'; /* From */
            tbody_filt += '<td>'+ filterList[i][5] +'</td>'; /* To */
            tbody_filt += '<td>'+ filterList[i][6] +'</td>'; /* IPM message */
            tbody_filt += '<td>'+ filterList[i][7] +'</td>'; /* OP Status */
            tbody_filt += '<td>'+ filterList[i][8] +'</td>'; /* ID */
            tbody_filt += '<td>'+ filterList[i][10] +'</td>'; /* Length */
            if(filterList[i][11]){
                tbody_filt += '<td>'+ filterList[i][11] +'</td>'; /* Data */
            }
            tbody_filt += '</tr>';
        }
        $('.tbody').html(tbody_filt);
    }
    else if(val.length == 0){
        $('.tbody').html(tbody);
    }
    else if(filterList.length == 0){
        $('.tbody').html(tbody_filt);
    }
});

$(document).on("click", "#searchBtn", function(ev){
    var toSearch = $("#search").val();
    if(toSearch == ""){
        $("#srchcnt").text("0 hit(s)");
        $("#srchcnt").css({"display":"none"});
        $('.tbody').html(tbody);
        return;
    }
    var srchList = [];
    var srchBody = "";
    var val = $('#filter').val();
    var cnt = 0;
    if(val.length == 0){
        //search in arrList
        for(var i = 1; i < arrList.length; i++){
            if( (arrList[i][2].includes(toSearch)) || (arrList[i][4].includes(toSearch)) || (arrList[i][5].includes(toSearch)) || (arrList[i][6].includes(toSearch)) || (arrList[i][7].includes(toSearch)) ||
            (arrList[i][8].includes(toSearch)) || (arrList[i][10].includes(toSearch)) ){
                srchList[cnt] = arrList[i];
                cnt++;
            }
            else if(arrList[i][11]){
                if(arrList[i][11].includes(toSearch)){
                    srchList[cnt] = arrList[i];
                    cnt++;
                }
            }
        }
    }
    else{
        //search in filterList
        for(var i = 0; i < filterList.length; i++){
            if( (filterList[i][2].includes(toSearch)) || (filterList[i][4].includes(toSearch)) || (filterList[i][5].includes(toSearch)) || (filterList[i][6].includes(toSearch)) || (filterList[i][7].includes(toSearch)) ||
            (filterList[i][8].includes(toSearch)) || (filterList[i][10].includes(toSearch)) ){
                srchList[cnt] = filterList[i];
                cnt++;
            }
            else if(filterList[i][11]){
                if(filterList[i][11].includes(toSearch)){
                    srchList[cnt] = filterList[i];
                    cnt++;
                }
            }
        }
    }
    $("#search").val("");
    //console.log(cnt);
    $("#srchcnt").text(toSearch+": "+cnt+" hit(s)");
    $("#srchcnt").css({"display":"block"});
    //console.log(srchList);
    for(var i=0; i < srchList.length; i++){
        srchBody += '<tr>';
        srchBody += '<td>'+ srchList[i][2] +'</td>'; /* Timestamp */
        srchBody += '<td>'+ srchList[i][4] +'</td>'; /* From */
        srchBody += '<td>'+ srchList[i][5] +'</td>'; /* To */
        srchBody += '<td>'+ srchList[i][6] +'</td>'; /* IPM message */
        srchBody += '<td>'+ srchList[i][7] +'</td>'; /* OP Status */
        srchBody += '<td>'+ srchList[i][8] +'</td>'; /* ID */
        srchBody += '<td>'+ srchList[i][10] +'</td>'; /* Length */
        if(srchList[i][11]){
            srchBody += '<td>'+ srchList[i][11] +'</td>'; /* Data */
        }
        srchBody += '</tr>';
    }
    $('.tbody').html(srchBody);
});


$(document).on("click", "#customFile", function(ev){
    $('#preload').css({"display":"block"});
    $('#app-content').css({"display":"none"});
});

/*$(document).on("click", "#customFile_os_des", function(ev){
    $('#preload').css({"display":"block"});
    $('#app-content').css({"display":"none"});
});*/

/*$(document).on("change", "#customFile_os_des", function(ev){
    //fileReader(ev);
    var oFile = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        const xmlText = event.target.result;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText,
                                                'text/xml');

        // Now you can work with the xmlDoc
        //console.log(xmlDoc);
        count = xmlDoc.getElementsByTagName("FunctionID").length;
        for(i=0;i<count;i++){
            ipmArray.push(xmlDoc.getElementsByTagName("FunctionID")[i].childNodes[0].nodeValue);
            //console.log(xmlDoc.getElementsByTagName("FunctionID")[i].childNodes[0].nodeValue);
        }
        //console.log(ipmArray)
        for(i=0;i<ipmArray.length;i++){
            //console.log(ipmArray[i])
            if(ipmArray[i]==0x2002)
                console.log("found")
        }
    };
    reader.readAsText(oFile);
});*/

$('#clear').click(function() {
    location.reload();
});

$(document).on("change", "#customFile_os_des", function(ev){
    //fileReader(ev);
    var oFile = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        const json_result = event.target.result;
        json_data = JSON.parse(json_result);
        //console.log(obj.IPMessages.error);
    };
    reader.readAsText(oFile);
    $("#json").text("Configuration uploaded successfully");
    $("#customFile").prop('disabled', false);
    $("#customFile_os_des").prop('disabled', true);
});

$(document).on("change", "#customFile", function(ev){
    fileReader(ev);
    
    var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 7000
    });

    Toast.fire({
        icon: 'success',
        title: 'Input file uploaded successfully'
    })
    
    setTimeout(
    function() 
    {
        $("span.select2").css({"width":"100%"});
        $('#preload').css({"display":"none"});
        $('#app-content').css({"display":"block"});
        $('#app-contentESS').css({"display":"block"});
    }, 500);
    $("#log").text("Log file uploaded successfully");
});

function fileReader(oEvent) {
    var oFile = oEvent.target.files[0];
    //var sFilename = oFile.name;

    $("#customFile").prop('disabled', true);

    arrList = [];
    errList = [];
    essList = [];
    audioEQList = [];
    audioSettings = [];
    variantList = [];
    speakerFailureList = [];
    tbody = "";
    var tbody_error = "";
    var tbody_data = "";
    var tbody_speakerfail = "";
    var tbody_eqswitch = "";
    var tbody_variant = "";

    var tbody_sdvc = "";
    var tbody_volmute = "";
    var tbody_bmt = "";
    var tbody_balfade = "";
    var tbody_att = "";
    var tbody_loudness = "";
    var tbody_sz = "";
    
    var reader = new FileReader();
    //var result = {};
    var err_cnt = 0;
    var listcnt = 0;
    var audioEqListcnt = 0;
    var audioSettingscnt = 0;
    var speakerFailureListcnt = 0;
    var variantListcnt = 0;
    var variantCar = "NA";
    
    reader.onload = function(e) {
        var data = e.target.result;
        data = new Uint8Array(data);
        var workbook = XLSX.read(data, {
            type:'array'
        });

        var result = {};
        workbook.SheetNames.forEach(function(sheetName) {
            var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
                header:1
            });
            if(roa.length) result[sheetName] = roa;
        });

        for(const [key, value] of Object.entries(result)) {
            arrList = value;
        }
        //console.log(arrList[1]);
        
        for(var i=1; i < arrList.length; i++){
            if(arrList[i][7] == json_data.IPMessages.error/*"IpmOpError"*/ || arrList[i][6] == json_data.IPMessages.dspIPMerror/*"DspErrorReport"*/){
                errList[err_cnt] = arrList[i];
                err_cnt++;
            }
            if(arrList[i][7] == json_data.IPMessages.IPMOPSETREQ/*"IpmOpSetRequest"*/ && arrList[i][6] == json_data.IPMessages.IPM201/*"AudioSettingsSet"*/){
                audioSettings[audioSettingscnt] = arrList[i];
                audioSettingscnt++;
            }
            if(arrList[i][7] == json_data.IPMessages.IPMOPCOM/*"IpmOpCommand"*/ && arrList[i][6] == json_data.IPMessages.customIPM2/*"UserdefFromMcu2"*/){
                speakerFailureList[speakerFailureListcnt] = arrList[i];
                speakerFailureListcnt++;
            }
            if(arrList[i][7] == json_data.IPMessages.IPMOPSETREQ/*"IpmOpSetRequest"*/ && arrList[i][6] == json_data.IPMessages.customIPM4/*"UserdefFromMcu4"*/){
                variantList[variantListcnt] = arrList[i];
                variantListcnt++;
                var dat = arrList[i][11].split(" ");
                if(dat[0] == json_data.variant_id.id0/*"00"*/){
                    variantCar = json_data.variant_name.name0/*"ECHO"*/;
                }
                else{
                    variantCar = json_data.variant_name.name1/*"DZ110"*/;
                }
            }
            if(arrList[i][7] == json_data.IPMessages.IPMOPCOMREQ/*"IpmOpCommandRequest"*/ && arrList[i][6] == json_data.IPMessages.customIPM3/*"UserdefFromMcu3"*/){
                essList[listcnt] = arrList[i];
                listcnt++;
            }
            else if(arrList[i][7] == json_data.IPMessages.IPMOPSETREQ/*"IpmOpSetRequest"*/ && arrList[i][6] == json_data.ess.ESSenable/*"FeatureEnable"*/){
                essList[listcnt] = arrList[i];
                listcnt++;
            }
            else if(arrList[i][11]){
                if(arrList[i][7] == json_data.IPMessages.IPMOPCOMREQ/*"IpmOpCommandRequest"*/ && arrList[i][6] == json_data.IPMessages.Gati400/*"GatixtpTransport"*/ && arrList[i][11].includes(json_data.ess.ESSVolume/*"F0 06"*/)){
                    essList[listcnt] = arrList[i];
                    listcnt++;
                }
                else if(arrList[i][7] == json_data.IPMessages.IPMOPCOMREQ/*"IpmOpCommandRequest"*/ && arrList[i][6] == json_data.IPMessages.Gati400/*"GatixtpTransport"*/ && arrList[i][11].includes(json_data.ess.ESSBoost/*"F8 0E"*/)){
                    essList[listcnt] = arrList[i];
                    listcnt++;
                }
                else if(arrList[i][7] == json_data.IPMessages.IPMOPRESP/*"IpmOpResponse"*/ && arrList[i][6] == json_data.IPMessages.Gati400/*"GatixtpTransport"*/ && arrList[i][11].includes("64 00 02 03")){
                    var dat = arrList[i][11].split(" ");
                    if(dat[4] == json_data.ESS_EQ_id.EQ1/*"0F"*/ || dat[4] == json_data.ESS_EQ_id.EQ2/*"10"*/){
                        essList[listcnt] = arrList[i];
                        listcnt++;
                    }
                    else{
                        audioEQList[audioEqListcnt] = arrList[i];
                        audioEqListcnt++;
                    }
                }
            }
            
            tbody += '<tr>';
            tbody += '<td>'+ arrList[i][2] +'</td>'; /* Timestamp */
            tbody += '<td>'+ arrList[i][4] +'</td>'; /* From */
            tbody += '<td>'+ arrList[i][5] +'</td>'; /* To */
            tbody += '<td>'+ arrList[i][6] +'</td>'; /* IPM message */
            tbody += '<td>'+ arrList[i][7] +'</td>'; /* OP Status */
            tbody += '<td>'+ arrList[i][8] +'</td>'; /* ID */
            //tbody += '<td>'+ arrList[i][10] +'</td>'; /* Length */
            if(arrList[i][11]){
                tbody += '<td>'+ arrList[i][11] +'</td>'; /* Data */
            }
            tbody += '</tr>';
        }
        
        for(var i=0; i < errList.length; i++){
            tbody_error += '<tr>';
            tbody_error += '<td>'+ errList[i][2] +'</td>'; /* Timestamp */
            tbody_error += '<td>'+ errList[i][4] +'</td>'; /* From */
            tbody_error += '<td>'+ errList[i][5] +'</td>'; /* To */
            tbody_error += '<td>'+ errList[i][6] +'</td>'; /* IPM message */
            tbody_error += '<td>'+ errList[i][7] +'</td>'; /* OP Status */
            tbody_error += '<td>'+ errList[i][8] +'</td>'; /* ID */
            tbody_error += '<td>'+ errList[i][10] +'</td>'; /* Length */
            if(errList[i][11]){
                tbody_error += '<td>'+ errList[i][11] +'</td>'; /* Data */
            }
            tbody_error += '</tr>';
        }

        for(var i=0; i < speakerFailureList.length; i++){
            tbody_speakerfail += '<tr>';
            tbody_speakerfail += '<td>'+ speakerFailureList[i][2] +'</td>'; /* Timestamp */
            tbody_speakerfail += '<td>'+ speakerFailureList[i][4] +'</td>'; /* From */
            tbody_speakerfail += '<td>'+ speakerFailureList[i][5] +'</td>'; /* To */
            tbody_speakerfail += '<td>'+ speakerFailureList[i][6] +'</td>'; /* IPM message */
            tbody_speakerfail += '<td>'+ speakerFailureList[i][7] +'</td>'; /* OP Status */
            tbody_speakerfail += '<td>'+ speakerFailureList[i][8] +'</td>'; /* ID */
            tbody_speakerfail += '<td>'+ speakerFailureList[i][10] +'</td>'; /* Length */
            if(speakerFailureList[i][11]){
                tbody_speakerfail += '<td>'+ speakerFailureList[i][11] +'</td>'; /* Data */
                var dat = speakerFailureList[i][11].split(" ");
                var failedSpeakers = "";
                if(dat[0]== json_data.speakerfailure.failed/*"01"*/)
                    failedSpeakers += json_data.channel_name.ch1 + " "/*"FRM, "*/;
                if(dat[1]== json_data.speakerfailure.failed/*"01"*/)
                    failedSpeakers += json_data.channel_name.ch2 + " "/*"FRM, "*/;
                if(dat[2]== json_data.speakerfailure.failed/*"01"*/)
                    failedSpeakers += json_data.channel_name.ch3 + " "/*"FLW, "*/;
                if(dat[3]== json_data.speakerfailure.failed/*"01"*/)
                    failedSpeakers += json_data.channel_name.ch4 + " "/*"FRW, "*/;
                if(dat[4]== json_data.speakerfailure.failed/*"01"*/)
                    failedSpeakers += json_data.channel_name.ch5 + " "/*"FLM, "*/;
                if(dat[5]== json_data.speakerfailure.failed/*"01"*/)
                    failedSpeakers += json_data.channel_name.ch6 + " "/*"BRWT, "*/;
                if(dat[6]== json_data.speakerfailure.failed/*"01"*/)
                    failedSpeakers += json_data.channel_name.ch7 + " "/*"BRWT, "*/;
                if(dat[7]== json_data.speakerfailure.failed/*"01"*/)
                    failedSpeakers += json_data.channel_name.ch8 + " "/*"BLWT, "*/;
                //failedSpeakers = failedSpeakers.substring(0, failedSpeakers.length - 2);
                tbody_speakerfail += '<td><span class="badge badge-dark">'+ failedSpeakers +'</span></td>'; /* Failed Speakers */
            }
            tbody_speakerfail += '</tr>';
        }

        for(var i=0; i < audioEQList.length; i++){
            tbody_eqswitch += '<tr>';
            tbody_eqswitch += '<td>'+ audioEQList[i][2] +'</td>'; /* Timestamp */
            tbody_eqswitch += '<td>'+ audioEQList[i][4] +'</td>'; /* From */
            tbody_eqswitch += '<td>'+ audioEQList[i][5] +'</td>'; /* To */
            tbody_eqswitch += '<td>'+ audioEQList[i][6] +'</td>'; /* IPM message */
            tbody_eqswitch += '<td>'+ audioEQList[i][7] +'</td>'; /* OP Status */
            tbody_eqswitch += '<td>'+ audioEQList[i][8] +'</td>'; /* ID */
            tbody_eqswitch += '<td>'+ audioEQList[i][10] +'</td>'; /* Length */
            if(audioEQList[i][11]){
                tbody_eqswitch += '<td>'+ audioEQList[i][11] +'</td>'; /* Data */
                var dat = audioEQList[i][11].split(" ");
                var eqName = "";
                if(dat[4] == json_data.EQ_id.EQ1/*"01"*/){
                    eqName = json_data.EQ_name.EQ1;
                }
                if(dat[4] == json_data.EQ_id.EQ2/*"02"*/){
                    eqName = json_data.EQ_name.EQ2;
                }
                if(dat[4] == json_data.EQ_id.EQ3/*"03"*/){
                    eqName = json_data.EQ_name.EQ3/*"Vehicle EQ"*/;
                }
                else if(dat[4] == json_data.EQ_id.EQ4/*"04"*/){
                    eqName = json_data.EQ_name.EQ4/*"SA A"*/;
                }
                else if(dat[4] == json_data.EQ_id.EQ5/*"05"*/){
                    eqName = json_data.EQ_name.EQ5/*"SA B"*/;
                }
                else if(dat[4] == json_data.EQ_id.EQ6/*"06"*/){
                    eqName = json_data.EQ_name.EQ6/*"SA C"*/;
                }
                else if(dat[4] == json_data.EQ_id.EQ7/*"07"*/){
                    eqName = json_data.EQ_name.EQ7/*"SA D"*/;
                }
                else if(dat[4] == json_data.EQ_id.EQ8/*"08"*/){
                    eqName = json_data.EQ_name.EQ8/*"SA E"*/;
                }
                else if(dat[4] == json_data.EQ_id.EQ9/*"09"*/){
                    eqName = json_data.EQ_name.EQ9/*"Media EQ"*/;
                }
                else if(dat[4] == json_data.EQ_id.EQ10/*"0A"*/){
                    eqName = json_data.EQ_name.EQ10/*"FM EQ"*/;
                }
                else if(dat[4] == json_data.EQ_id.EQ11/*"0B"*/){
                    eqName = json_data.EQ_name.EQ11/*"AM EQ"*/;
                }
                else if(dat[4] == json_data.EQ_id.EQ12/*"0C"*/){
                    eqName = json_data.EQ_name.EQ12/*"DAB EQ"*/;
                }
                else if(dat[4] == json_data.EQ_id.EQ13/*"0D"*/){
                    eqName = json_data.EQ_name.EQ13/*"LHD EQ"*/;
                }
                else if(dat[4] == json_data.EQ_id.EQ14/*"0E"*/){
                    eqName = json_data.EQ_name.EQ14/*"RHD EQ"*/;
                }
                else if(dat[4] == json_data.EQ_id.EQ15/*"0F"*/){
                    eqName = json_data.EQ_name.EQ15/*"ESS Alpine EQ"*/;
                }
                else if(dat[4] == json_data.EQ_id.EQ16/*"10"*/){
                    eqName = json_data.EQ_name.EQ16/*"ESS Alternative EQ"*/;
                }
                tbody_eqswitch += '<td><span class="badge badge-dark">'+ eqName +'</span></td>'; /* EQ Name */
            }
            tbody_eqswitch += '</tr>';
        }

        for(var i=0; i < variantList.length; i++){
            tbody_variant += '<tr>';
            tbody_variant += '<td>'+ variantList[i][2] +'</td>'; /* Timestamp */
            tbody_variant += '<td>'+ variantList[i][4] +'</td>'; /* From */
            tbody_variant += '<td>'+ variantList[i][5] +'</td>'; /* To */
            tbody_variant += '<td>'+ variantList[i][6] +'</td>'; /* IPM message */
            tbody_variant += '<td>'+ variantList[i][7] +'</td>'; /* OP Status */
            tbody_variant += '<td>'+ variantList[i][8] +'</td>'; /* ID */
            tbody_variant += '<td>'+ variantList[i][10] +'</td>'; /* Length */
            if(variantList[i][11]){
                tbody_variant += '<td>'+ variantList[i][11] +'</td>'; /* Data */
            }
            tbody_variant += '</tr>';
        }

        var mask3;
        var mask2;
        var mask1;
        var mask0;
        var mask_full;
        
        var volmute_count = 0;
        var bmt_count = 0;
        var balfade_count = 0;
        var att_count = 0;
        var sdvc_count = 0;
        var loudness_count = 0;
        var szone_count = 0;

        for(var i=0; i < audioSettings.length; i++){
            //console.log(audioSettings[i][11]);
            var data = audioSettings[i][11].split(" ");
            mask3 = parseInt(data[1],16);
            mask2 = parseInt(data[2],16);
            mask1 = parseInt(data[3],16);
            mask0 = parseInt(data[4],16);
            mask_full = parseInt(mask3 | mask2 << 8 | mask1 << 16 | mask0 << 24);
            //console.log(mask_full.toString(16));
            if(mask_full & 1 == 1){
                //fade time changed.
            }
            if(mask_full & 2 == 2){
                //volume changed.
                volmute_count++;
                //volmute.push(audioSettings[i][2], data[7]);
                tbody_volmute += '<tr>';
                tbody_volmute += '<td>'+ audioSettings[i][2] +'</td>';
                if(data[0] == json_data.sinkid.sinkid1/*1*/){
                    tbody_volmute += '<td>'+ json_data.sinkid_name.sinkid1/*Main audio*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid2/*2*/){
                    tbody_volmute += '<td>'+ json_data.sinkid_name.sinkid2/*Stream mix 1*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid3/*3*/){
                    tbody_volmute += '<td>'+ json_data.sinkid_name.sinkid3/*Stream mix 2*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid4/*4*/){
                    tbody_volmute += '<td>'+ json_data.sinkid_name.sinkid4/*Stream mix 3*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid5/*5*/){
                    tbody_volmute += '<td>'+ json_data.sinkid_name.sinkid5/*Main audio 2*/ + '</td>';
                }
                tbody_volmute += '<td>'+ parseInt(data[7],16) +'%</td>';
                tbody_volmute += '</tr>';
            }
            if(mask_full & 4 == 4){
                //Bass changed.
                bmt_count++;
                //bmt.push(audioSettings[i][2], data[8]);
                tbody_bmt += '<tr>';
                tbody_bmt += '<td>'+ audioSettings[i][2] +'</td>';
                if(data[0] == json_data.sinkid.sinkid1/*1*/){
                    tbody_bmt += '<td>'+ json_data.sinkid_name.sinkid1/*Main audio*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid2/*2*/){
                    tbody_bmt += '<td>'+ json_data.sinkid_name.sinkid2/*Stream mix 1*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid3/*3*/){
                    tbody_bmt += '<td>'+ json_data.sinkid_name.sinkid3/*Stream mix 2*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid4/*4*/){
                    tbody_bmt += '<td>'+ json_data.sinkid_name.sinkid4/*Stream mix 3*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid5/*5*/){
                    tbody_bmt += '<td>'+ json_data.sinkid_name.sinkid5/*Main audio 2*/ + '</td>';
                }
                tbody_bmt += '<td>'+ parseInt(data[8],16) +'% Bass</td>';
                tbody_bmt += '</tr>';
            }
            if(mask_full & 8 == 8){
                //Mid changed.
                bmt_count++;
                //bmt.push(audioSettings[i][2], data[9]);
                tbody_bmt += '<tr>';
                tbody_bmt += '<td>'+ audioSettings[i][2] +'</td>';
                if(data[0] == json_data.sinkid.sinkid1/*1*/){
                    tbody_bmt += '<td>'+ json_data.sinkid_name.sinkid1/*Main audio*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid2/*2*/){
                    tbody_bmt += '<td>'+ json_data.sinkid_name.sinkid2/*Stream mix 1*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid3/*3*/){
                    tbody_bmt += '<td>'+ json_data.sinkid_name.sinkid3/*Stream mix 2*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid4/*4*/){
                    tbody_bmt += '<td>'+ json_data.sinkid_name.sinkid4/*Stream mix 3*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid5/*5*/){
                    tbody_bmt += '<td>'+ json_data.sinkid_name.sinkid5/*Main audio 2*/ + '</td>';
                }
                tbody_bmt += '<td>'+ parseInt(data[9],16) +'% Mid</td>';
                tbody_bmt += '</tr>';
            }
            if(mask_full & 16 == 16){
                //Treble changed.
                bmt_count++;
                //bmt.push(audioSettings[i][2], data[10]);
                tbody_bmt += '<tr>';
                tbody_bmt += '<td>'+ audioSettings[i][2] +'</td>';
                if(data[0] == json_data.sinkid.sinkid1/*1*/){
                    tbody_bmt += '<td>'+ json_data.sinkid_name.sinkid1/*Main audio*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid2/*2*/){
                    tbody_bmt += '<td>'+ json_data.sinkid_name.sinkid2/*Stream mix 1*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid3/*3*/){
                    tbody_bmt += '<td>'+ json_data.sinkid_name.sinkid3/*Stream mix 2*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid4/*4*/){
                    tbody_bmt += '<td>'+ json_data.sinkid_name.sinkid4/*Stream mix 3*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid5/*5*/){
                    tbody_bmt += '<td>'+ json_data.sinkid_name.sinkid5/*Main audio 2*/ + '</td>';
                }
                tbody_bmt += '<td>'+ parseInt(data[10],16) +'% Treble</td>';
                tbody_bmt += '</tr>';
            }
            if(mask_full & 32 == 32){
                //Balance changed.
                balfade_count++;
                //balfade.push(audioSettings[i][2], data[11]);
                tbody_balfade += '<tr>';
                tbody_balfade += '<td>'+ audioSettings[i][2] +'</td>';
                if(data[0] == json_data.sinkid.sinkid1/*1*/){
                    tbody_balfade += '<td>'+ json_data.sinkid_name.sinkid1/*Main audio*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid2/*2*/){
                    tbody_balfade += '<td>'+ json_data.sinkid_name.sinkid2/*Stream mix 1*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid3/*3*/){
                    tbody_balfade += '<td>'+ json_data.sinkid_name.sinkid3/*Stream mix 2*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid4/*4*/){
                    tbody_balfade += '<td>'+ json_data.sinkid_name.sinkid4/*Stream mix 3*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid5/*5*/){
                    tbody_balfade += '<td>'+ json_data.sinkid_name.sinkid5/*Main audio 2*/ + '</td>';
                }
                tbody_balfade += '<td>'+ parseInt(data[11],16) +'% Balance</td>';
                tbody_balfade += '</tr>';
            }
            if(mask_full & 64 == 64){
                //fade changed.
                balfade_count++;
                //balfade.push(audioSettings[i][2], data[12]);
                tbody_balfade += '<tr>';
                tbody_balfade += '<td>'+ audioSettings[i][2] +'</td>';
                if(data[0] == json_data.sinkid.sinkid1/*1*/){
                    tbody_balfade += '<td>'+ json_data.sinkid_name.sinkid1/*Main audio*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid2/*2*/){
                    tbody_balfade += '<td>'+ json_data.sinkid_name.sinkid2/*Stream mix 1*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid3/*3*/){
                    tbody_balfade += '<td>'+ json_data.sinkid_name.sinkid3/*Stream mix 2*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid4/*4*/){
                    tbody_balfade += '<td>'+ json_data.sinkid_name.sinkid4/*Stream mix 3*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid5/*5*/){
                    tbody_balfade += '<td>'+ json_data.sinkid_name.sinkid5/*Main audio 2*/ + '</td>';
                }
                tbody_balfade += '<td>'+ parseInt(data[12],16) +'% Fade</td>';
                tbody_balfade += '</tr>';
            }
            if(mask_full & 256 == 256){
                //Input gain offset changed.
                //att.push(audioSettings[i][2], data[14]);
                att_count++;
                tbody_att += '<tr>';
                tbody_att += '<td>'+ audioSettings[i][2] +'</td>';
                if(data[0] == json_data.sinkid.sinkid1/*1*/){
                    tbody_att += '<td>'+ json_data.sinkid_name.sinkid1/*Main audio*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid2/*2*/){
                    tbody_att += '<td>'+ json_data.sinkid_name.sinkid2/*Stream mix 1*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid3/*3*/){
                    tbody_att += '<td>'+ json_data.sinkid_name.sinkid3/*Stream mix 2*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid4/*4*/){
                    tbody_att += '<td>'+ json_data.sinkid_name.sinkid4/*Stream mix 3*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid5/*5*/){
                    tbody_att += '<td>'+ json_data.sinkid_name.sinkid5/*Main audio 2*/ + '</td>';
                }
                tbody_att += '<td>'+ parseInt(data[14],16) +'dB</td>';
                tbody_att += '</tr>';
            }
            if((mask_full & 512) == 512){
                //SDVC changed.
                //sdvc.push(audioSettings[i][2], data[15]);
                sdvc_count++;
                tbody_sdvc += '<tr>';
                tbody_sdvc += '<td>'+ audioSettings[i][2] +'</td>';
                if(data[0] == json_data.sinkid.sinkid1/*1*/){
                    tbody_sdvc += '<td>'+ json_data.sinkid_name.sinkid1/*Main audio*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid2/*2*/){
                    tbody_sdvc += '<td>'+ json_data.sinkid_name.sinkid2/*Stream mix 1*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid3/*3*/){
                    tbody_sdvc += '<td>'+ json_data.sinkid_name.sinkid3/*Stream mix 2*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid4/*4*/){
                    tbody_sdvc += '<td>'+ json_data.sinkid_name.sinkid4/*Stream mix 3*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid5/*5*/){
                    tbody_sdvc += '<td>'+ json_data.sinkid_name.sinkid5/*Main audio 2*/ + '</td>';
                }
                tbody_sdvc += '<td>'+ parseInt(data[15],16) +'</td>';
                tbody_sdvc += '</tr>';
            }
            if(mask_full & 1024 == 1024){
                //Loudness1 changed.
                loudness_count++;
                //loudness.push(audioSettings[i][2], data[16]);
                tbody_loudness += '<tr>';
                tbody_loudness += '<td>'+ audioSettings[i][2] +'</td>';
                if(data[0] == json_data.sinkid.sinkid1/*1*/){
                    tbody_loudness += '<td>'+ json_data.sinkid_name.sinkid1/*Main audio*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid2/*2*/){
                    tbody_loudness += '<td>'+ json_data.sinkid_name.sinkid2/*Stream mix 1*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid3/*3*/){
                    tbody_loudness += '<td>'+ json_data.sinkid_name.sinkid3/*Stream mix 2*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid4/*4*/){
                    tbody_loudness += '<td>'+ json_data.sinkid_name.sinkid4/*Stream mix 3*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid5/*5*/){
                    tbody_loudness += '<td>'+ json_data.sinkid_name.sinkid5/*Main audio 2*/ + '</td>';
                }
                tbody_loudness += '<td>'+ parseInt(data[16],16) +'</td>';
                tbody_loudness += '</tr>';
            }
            if(mask_full & 2048 == 2048){
                //Loudness2 changed.
            }
            if(mask_full & 4096 == 4096){
                //Sound zone changed.
                szone_count++;
                //szone.push(audioSettings[i][2], data[18]);
                tbody_sz += '<tr>';
                tbody_sz += '<td>'+ audioSettings[i][2] +'</td>';
                if(data[0] == json_data.sinkid.sinkid1/*1*/){
                    tbody_sz += '<td>'+ json_data.sinkid_name.sinkid1/*Main audio*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid2/*2*/){
                    tbody_sz += '<td>'+ json_data.sinkid_name.sinkid2/*Stream mix 1*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid3/*3*/){
                    tbody_sz += '<td>'+ json_data.sinkid_name.sinkid3/*Stream mix 2*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid4/*4*/){
                    tbody_sz += '<td>'+ json_data.sinkid_name.sinkid4/*Stream mix 3*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid5/*5*/){
                    tbody_sz += '<td>'+ json_data.sinkid_name.sinkid5/*Main audio 2*/ + '</td>';
                }
                tbody_sz += '<td>'+ parseInt(data[18],16) +'</td>';
                tbody_sz += '</tr>';
            }
            if(mask_full & 128 == 128){
                //Mute changed.
                volmute_count++;
                //volmute.push(audioSettings[i][2], data[13]);
                tbody_volmute += '<tr>';
                tbody_volmute += '<td>'+ audioSettings[i][2] +'</td>';
                if(data[0] == json_data.sinkid.sinkid1/*1*/){
                    tbody_volmute += '<td>'+ json_data.sinkid_name.sinkid1/*Main audio*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid2/*2*/){
                    tbody_volmute += '<td>'+ json_data.sinkid_name.sinkid2/*Stream mix 1*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid3/*3*/){
                    tbody_volmute += '<td>'+ json_data.sinkid_name.sinkid3/*Stream mix 2*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid4/*4*/){
                    tbody_volmute += '<td>'+ json_data.sinkid_name.sinkid4/*Stream mix 3*/ + '</td>';
                }
                else if(data[0] == json_data.sinkid.sinkid5/*5*/){
                    tbody_volmute += '<td>'+ json_data.sinkid_name.sinkid5/*Main audio 2*/ + '</td>';
                }

                if(parseInt(data[13],16) == 1){
                    tbody_volmute += '<td>Mute</td>';
                }
                else if(parseInt(data[13],16) == 0){
                    tbody_volmute += '<td>Unmute</td>';
                }
                
                tbody_volmute += '</tr>';
            }
        }

        $(".tbody-volmute").html(tbody_volmute);
        $("#volmute_count").text(volmute_count);

        $(".tbody-balfade").html(tbody_balfade);
        $("#balfade_count").text(balfade_count);

        $(".tbody-bmt").html(tbody_bmt);
        $("#bmt_count").text(bmt_count);

        $(".tbody-loudness").html(tbody_loudness);
        $("#loudness_count").text(loudness_count);

        $(".tbody-sz").html(tbody_sz);
        $("#sz_count").text(szone_count);

        $(".tbody-att").html(tbody_att);
        $("#att_count").text(att_count);

        $(".tbody-sdvc").html(tbody_sdvc);
        $("#sdvc_count").text(sdvc_count);

        var myArray = [];
        var xValues = [];
        var yValues = [];
        var xValuesRELRPM = [];
        var yValuesRELRPM = [];
        var xValuesRERRPM = [];
        var yValuesRERRPM = [];
        var xValuesTor = [];
        var yValuesTor = [];
        var xValuesRELTor = [];
        var yValuesRELTor = [];
        var xValuesRERTor = [];
        var yValuesRERTor = [];
        var xValuesGlobalTor = [];
        var yValuesGlobalTor = [];
        var xValuesPedal = [];
        var yValuesPedal = [];
        var xValuesacc = [];
        var yValuesacc = [];
        var xValuesspeed = [];
        var yValuesspeed = [];
        var xValuesLC = [];
        var yValuesLC = [];
        var xValuesEnable = [];
        var yValuesEnable = [];
        var xValuesVol= [];
        var yValuesVol = [];
        var xValuesESSsoundswitch= [];
        var yValuesESSsoundswitch = [];
        var xValuesBoost= [];
        var yValuesBoost = [];
        var xValuesTheme = [];
        var yValuesTheme = [];

        for(var i=0; i < essList.length;i++){
            myArray = essList[i][11].split(" ");
            //console.log(myArray)
            if(essList[i][6] == json_data.ess.ESSenable/*"FeatureEnable"*/){
                var dataEnable = essList[i][11].split(" ")
                xValuesEnable.push(essList[i][2]);
                yValuesEnable.push(dataEnable[1]);
            }
            for(var j=0; j<myArray.length;j++){
                //if(myArray[j] == "F0" && myArray[j+1] == "20"){
                if(myArray[j] + " " + myArray[j+1] == json_data.ess.ESSFrontRPM){
                    var val = myArray[j+2] + myArray[j+3];
                    if(val.startsWith("FF")){
                        //Negative number
                        //console.log("Negative number");
                        var aa = (parseInt(val, 16)).toString(2);
                        //console.log(aa);
                        var bb = 0-onesComplement(aa.toString(10));
                        //console.log(bb);
                        xValues.push([essList[i][2]]);
                        yValues.push(bb);
                    }
                    else{
                        //console.log(val)
                        val = Number("0x"+val)
                        //console.log(val)
                        xValues.push([essList[i][2]]);
                        yValues.push(val);
                    }
                }
                //else if(myArray[j] == "F0" && myArray[j+1] == "21"){//REL RPM
                else if(myArray[j] + " " +  myArray[j+1] == json_data.ess.ESSRELRPM){
                    var val = myArray[j+2] + myArray[j+3];
                    if(val.startsWith("FF")){
                        //Negative number
                        //console.log("Negative number");
                        var aa = (parseInt(val, 16)).toString(2);
                        //console.log(aa);
                        var bb = 0-onesComplement(aa.toString(10));
                        //console.log(bb);
                        xValuesRELRPM.push([essList[i][2]]);
                        yValuesRELRPM.push(bb);
                    }
                    else{
                        //console.log(val)
                        val = Number("0x"+val)
                        //console.log(val)
                        xValuesRELRPM.push([essList[i][2]]);
                        yValuesRELRPM.push(val);
                    }
                }
                //else if(myArray[j] == "F0" && myArray[j+1] == "22"){//RER RPM
                else if(myArray[j] + " " +  myArray[j+1] == json_data.ess.ESSRERRPM){
                    var val = myArray[j+2] + myArray[j+3];
                    if(val.startsWith("FF")){
                        //Negative number
                        //console.log("Negative number");
                        var aa = (parseInt(val, 16)).toString(2);
                        //console.log(aa);
                        var bb = 0-onesComplement(aa.toString(10));
                        //console.log(bb);
                        xValuesRERRPM.push([essList[i][2]]);
                        yValuesRERRPM.push(bb);
                    }
                    else{
                        //console.log(val)
                        val = Number("0x"+val)
                        //console.log(val)
                        xValuesRERRPM.push([essList[i][2]]);
                        yValuesRERRPM.push(val);
                    }
                }
                //else if(myArray[j] == "F0" && myArray[j+1] == "23"){
                else if(myArray[j] + " " +  myArray[j+1] == json_data.ess.ESSFrontTorque){
                    var val = myArray[j+2] + myArray[j+3];
                    if(val.startsWith("FF")){
                        //Negative number
                        //console.log("Negative number");
                        var aa = (parseInt(val, 16)).toString(2);
                        //console.log(aa);
                        var bb = 0-onesComplement(aa.toString(10));
                        //console.log(bb);
                        xValuesTor.push([essList[i][2]]);
                        yValuesTor.push(bb);
                    }
                    else{
                        //console.log(val)
                        val = Number("0x"+val)
                        //console.log(val)
                        xValuesTor.push([essList[i][2]]);
                        yValuesTor.push(val);
                    }
                }
                //else if(myArray[j] == "F0" && myArray[j+1] == "24"){//REL Torque
                else if(myArray[j] + " " +  myArray[j+1] == json_data.ess.ESSRELTorque){
                    var val = myArray[j+2] + myArray[j+3];
                    if(val.startsWith("FF")){
                        //Negative number
                        //console.log("Negative number");
                        var aa = (parseInt(val, 16)).toString(2);
                        //console.log(aa);
                        var bb = 0-onesComplement(aa.toString(10));
                        //console.log(bb);
                        xValuesRELTor.push([essList[i][2]]);
                        yValuesRELTor.push(bb);
                    }
                    else{
                        //console.log(val)
                        val = Number("0x"+val)
                        //console.log(val)
                        xValuesRELTor.push([essList[i][2]]);
                        yValuesRELTor.push(val);
                    }
                }
                //else if(myArray[j] == "F0" && myArray[j+1] == "25"){//RER Torque
                else if(myArray[j] + " " +  myArray[j+1] == json_data.ess.ESSRERTorque){
                    var val = myArray[j+2] + myArray[j+3];
                    if(val.startsWith("FF")){
                        //Negative number
                        //console.log("Negative number");
                        var aa = (parseInt(val, 16)).toString(2);
                        //console.log(aa);
                        var bb = 0-onesComplement(aa.toString(10));
                        //console.log(bb);
                        xValuesRERTor.push([essList[i][2]]);
                        yValuesRERTor.push(bb);
                    }
                    else{
                        //console.log(val)
                        val = Number("0x"+val)
                        //console.log(val)
                        xValuesRERTor.push([essList[i][2]]);
                        yValuesRERTor.push(val);
                    }
                }
                //else if(myArray[j] == "F0" && myArray[j+1] == "14"){//Global Torque
                else if(myArray[j] + " " +  myArray[j+1] == json_data.ess.ESSGlobalTorque){
                    var val = myArray[j+2] + myArray[j+3];
                    if(val.startsWith("FF")){
                        //Negative number
                        //console.log("Negative number");
                        var aa = (parseInt(val, 16)).toString(2);
                        //console.log(aa);
                        var bb = 0-onesComplement(aa.toString(10));
                        //console.log(bb);
                        xValuesGlobalTor.push([essList[i][2]]);
                        yValuesGlobalTor.push(bb);
                    }
                    else{
                        //console.log(val)
                        val = Number("0x"+val)
                        //console.log(val)
                        xValuesGlobalTor.push([essList[i][2]]);
                        yValuesGlobalTor.push(val);
                    }
                }
                //else if(myArray[j] == "F0" && myArray[j+1] == "50"){ //Pedal
                else if(myArray[j] + " " +  myArray[j+1] == json_data.ess.ESSPedal){
                    var val = myArray[j+2] + myArray[j+3];
                    if(val.startsWith("FF")){
                        //Negative number
                        //console.log("Negative number");
                        var aa = (parseInt(val, 16)).toString(2);
                        //console.log(aa);
                        var bb = 0-onesComplement(aa.toString(10));
                        //console.log(bb);
                        xValuesPedal.push([essList[i][2]]);
                        yValuesPedal.push(bb);
                    }
                    else{
                        //console.log(val)
                        val = Number("0x"+val)
                        //console.log(val)
                        xValuesPedal.push([essList[i][2]]);
                        yValuesPedal.push(val);
                    }
                }
                //else if(myArray[j] == "F0" && myArray[j+1] == "09"){//Lg acc
                else if(myArray[j] + " " +  myArray[j+1] == json_data.ess.ESSLgAcc){
                    var val = myArray[j+2] + myArray[j+3];
                    if(val.startsWith("FF")){
                        //Negative number
                        //console.log("Negative number");
                        var aa = (parseInt(val, 16)).toString(2);
                        //console.log(aa);
                        var bb = 0-onesComplement(aa.toString(10));
                        //console.log(bb);
                        xValuesacc.push([essList[i][2]]);
                        yValuesacc.push(bb);
                    }
                    else{
                        //console.log(val)
                        val = Number("0x"+val)
                        //console.log(val)
                        xValuesacc.push([essList[i][2]]);
                        yValuesacc.push(val);
                    }
                }
                //else if(myArray[j] == "00" && myArray[j+1] == "11"){//Speed
                else if(myArray[j] + " " +  myArray[j+1] == json_data.ess.ESSSpeed){
                    var val = myArray[j+2] + myArray[j+3];
                    if(val.startsWith("FF")){
                        //Negative number
                        //console.log("Negative number");
                        var aa = (parseInt(val, 16)).toString(2);
                        //console.log(aa);
                        var bb = 0-onesComplement(aa.toString(10));
                        //console.log(bb);
                        xValuesspeed.push([essList[i][2]]);
                        yValuesspeed.push(bb);
                    }
                    else{
                        //console.log(val)
                        val = Number("0x"+val)
                        //console.log(val)
                        xValuesspeed.push([essList[i][2]]);
                        yValuesspeed.push(val);
                    }
                }
                //else if(myArray[j] == "F0" && myArray[j+1] == "0B"){//LC
                else if(myArray[j] + " " +  myArray[j+1] == json_data.ess.ESSLauncCtrl){
                    var val = myArray[j+2] + myArray[j+3];
                    if(val.startsWith("FF")){
                        //Negative number
                        //console.log("Negative number");
                        var aa = (parseInt(val, 16)).toString(2);
                        //console.log(aa);
                        var bb = 0-onesComplement(aa.toString(10));
                        //console.log(bb);
                        xValuesLC.push([essList[i][2]]);
                        yValuesLC.push(bb);
                    }
                    else{
                        //console.log(val)
                        val = Number("0x"+val)
                        //console.log(val)
                        xValuesLC.push([essList[i][2]]);
                        yValuesLC.push(val);
                    }
                }
                //else if(myArray[j] == "F0" && myArray[j+1] == "06"){//ESS Vol
                else if(myArray[j] + " " + myArray[j+1] == json_data.ess.ESSVolume){
                    var val = myArray[j+2] + myArray[j+3];
                    if(val.startsWith("FF")){
                        //Negative number
                        //console.log("Negative number");
                        var aa = (parseInt(val, 16)).toString(2);
                        //console.log(aa);
                        var bb = 0-onesComplement(aa.toString(10));
                        //console.log(bb);
                        xValuesVol.push([essList[i][2]]);
                        yValuesVol.push(bb);
                    }
                    else{
                        //console.log(val)
                        val = Number("0x"+val)
                        //console.log(val)
                        xValuesVol.push([essList[i][2]]);
                        yValuesVol.push(val);
                    }
                }
                else if(myArray[j] == "64" && myArray[j+1] == "00" && myArray[j+2] == "02" && myArray[j+3] == "03"){//ESS EQ switch
                    var val = myArray[j+4];
                    xValuesESSsoundswitch.push([essList[i][2]]);
                    if(val == "0F")
                        yValuesESSsoundswitch.push(0);
                    else if(val == "10")
                        yValuesESSsoundswitch.push(1);
                }
                //else if(myArray[j] == "F8" && myArray[j+1] == "0E"){//ESS Boost
                else if(myArray[j] + " "  + myArray[j+1] == json_data.ess.ESSBoost){
                    var val = myArray[j+2] + myArray[j+3];
                    if(val.startsWith("FF")){
                        //Negative number
                        //console.log("Negative number");
                        var aa = (parseInt(val, 16)).toString(2);
                        //console.log(aa);
                        var bb = 0-onesComplement(aa.toString(10));
                        //console.log(bb);
                        xValuesBoost.push([essList[i][2]]);
                        yValuesBoost.push(bb);
                    }
                    else{
                        //console.log(val)
                        val = Number("0x"+val)
                        //console.log(val)
                        xValuesBoost.push([essList[i][2]]);
                        yValuesBoost.push(val);
                    }
                }
            }
        }

        var yLabels = {
            0 : json_data.ESS_EQ_name.EQ1/*'Alpine'*/, 1 : json_data.ESS_EQ_name.EQ2/*'Alternative'*/
        }

        var yLabelsESSVolume = {
            0 : json_data.ESS_Volume_names.name1/*'OFF'*/, 1 : json_data.ESS_Volume_names.name2/*'LOW'*/, 2: json_data.ESS_Volume_names.name3/*'HIGH'*/
        }

        var yLabelsBoost = {
            1 : json_data.Boost_status.status1/*'Activated'*/, 4 : json_data.Boost_status.status2/*'Deactivated'*/
        }

        var yLabelsLC = {
            0 : json_data.Launch_control.status1/*'Unavailable'*/, 1 : json_data.Launch_control.status2/*'Not Active'*/, 2 : json_data.Launch_control.status3/*'LC Ready'*/, 3: json_data.Launch_control.status4/*'LC Take off'*/
        }

        var yLabelsFeatureESS = {
            0 : json_data.ESS_status.status1/*'ESS OFF'*/, 1 : json_data.ESS_status.status2/*'ESS ON'*/
        }

        var yLabelsTheme = {
            0 : json_data.ESS_theme_names.name1/*'Theme A'*/, 1 : json_data.ESS_theme_names.name2/*'Theme C'*/, 2 : json_data.ESS_theme_names.name3/*'Theme E'*/
        }

        var themeLength = 0;
        var theme = -1;
        if(yValuesspeed.length > yValuesacc.length) 
            themeLength = yValuesspeed.length;
        else
            themeLength = yValuesacc.length;
        for(var i =0; i < themeLength; i++){
            if(yValuesspeed[i] == 0){
                if(theme != 0){
                    theme = 0;
                    xValuesTheme.push(xValuesacc[i]);
                    yValuesTheme.push(0);
                }
            }
            else if(yValuesacc[i] > 0 && yValuesspeed[i] != 0){
                if(theme != 1){
                    theme = 1;
                    xValuesTheme.push(xValuesacc[i]);
                    yValuesTheme.push(1);
                }
            }
            else if(yValuesacc[i] < 0 && yValuesspeed[i] != 0){
                if(theme != 2){
                    theme = 2;
                    xValuesTheme.push(xValuesacc[i]);
                    yValuesTheme.push(2);
                }
            }
            
        }

        for(var i =0; i < xValuesTheme.length; i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValuesTheme[i] +'</td>';
            if(yValuesTheme[i] == 0)
                tbody_data += '<td>' + json_data.ESS_theme_names.name1/*Theme A*/ + '</td>';
            else if(yValuesTheme[i] == 1)
                tbody_data += '<td>' + json_data.ESS_theme_names.name2/*Theme C*/ + '</td>';
            else if(yValuesTheme[i] == 2)
                tbody_data += '<td>' + json_data.ESS_theme_names.name3/*Theme E*/ + '</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-themeData").html(tbody_data);

        tbody_data="";
        for(var i=0; i<xValues.length;i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValues[i] +'</td>';
            tbody_data += '<td>'+ yValues[i] +'</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-frontRPMData").html(tbody_data);

        tbody_data="";
        for(var i=0; i<xValuesRELRPM.length;i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValuesRELRPM[i] +'</td>';
            tbody_data += '<td>'+ yValuesRELRPM[i] +'</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-rlRPMData").html(tbody_data);

        tbody_data="";
        for(var i=0; i<xValuesRERRPM.length;i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValuesRERRPM[i] +'</td>';
            tbody_data += '<td>'+ yValuesRERRPM[i] +'</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-rrRPMData").html(tbody_data);

        tbody_data="";
        for(var i=0; i<xValuesTor.length;i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValuesTor[i] +'</td>';
            tbody_data += '<td>'+ yValuesTor[i] +'</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-frontTorqueData").html(tbody_data);

        tbody_data="";
        for(var i=0; i<xValuesRELTor.length;i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValuesRELTor[i] +'</td>';
            tbody_data += '<td>'+ yValuesRELTor[i] +'</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-rlTorqueData").html(tbody_data);

        tbody_data="";
        for(var i=0; i<xValuesRERTor.length;i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValuesRERTor[i] +'</td>';
            tbody_data += '<td>'+ yValuesRERTor[i] +'</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-rrTorqueData").html(tbody_data);

        tbody_data="";
        for(var i=0; i<xValuesGlobalTor.length;i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValuesGlobalTor[i] +'</td>';
            tbody_data += '<td>'+ yValuesGlobalTor[i] +'</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-globalTorqueData").html(tbody_data);

        tbody_data="";
        for(var i=0; i<xValuesspeed.length;i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValuesspeed[i] +'</td>';
            tbody_data += '<td>'+ yValuesspeed[i] +'</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-speedData").html(tbody_data);

        tbody_data="";
        for(var i=0; i<xValuesPedal.length;i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValuesPedal[i] +'</td>';
            tbody_data += '<td>'+ yValuesPedal[i] +'</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-pedalData").html(tbody_data);

        tbody_data="";
        for(var i=0; i<xValuesacc.length;i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValuesacc[i] +'</td>';
            tbody_data += '<td>'+ yValuesacc[i] +'</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-accData").html(tbody_data);

        tbody_data="";
        for(var i=0; i<xValuesLC.length;i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValuesLC[i] +'</td>';
            if(yValuesLC[i] == 0)
                tbody_data += '<td>' + json_data.Launch_control.status1/*Not Available*/ + '</td>';
            else if(yValuesLC[i] == 1)
                tbody_data += '<td>' + json_data.Launch_control.status2/*Not Active*/ + '</td>';
            else if(yValuesLC[i] == 2)
                tbody_data += '<td>' + json_data.Launch_control.status3/*LC Ready*/ + '</td>';
            else if(yValuesLC[i] == 3)
                tbody_data += '<td>' + json_data.Launch_control.status4/*LC Take off*/ + '</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-lcData").html(tbody_data);

        tbody_data="";
        for(var i=0; i<xValuesEnable.length;i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValuesEnable[i] +'</td>';
            if(yValuesEnable[i] == "00")
                tbody_data += '<td>' + json_data.ESS_status.status1/*OFF*/ + '</td>';
            else if(yValuesEnable[i] == "01")
                tbody_data += '<td>' + json_data.ESS_status.status2/*ON*/ + '</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-essfeatureenableData").html(tbody_data);

        tbody_data="";
        for(var i=0; i<xValuesVol.length;i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValuesVol[i] +'</td>';
            if(yValuesVol[i] == "0")
                tbody_data += '<td>' + json_data.ESS_Volume_names.name1/*OFF*/ + '</td>';
            else if(yValuesVol[i] == "1")
                tbody_data += '<td>' + json_data.ESS_Volume_names.name2/*LOW*/ + '</td>';
            else if(yValuesVol[i] == "2")
                tbody_data += '<td>' + json_data.ESS_Volume_names.name3/*HIGH*/ + '</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-essvolumeData").html(tbody_data);

        tbody_data="";
        for(var i=0; i<xValuesESSsoundswitch.length;i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValuesESSsoundswitch[i] +'</td>';
            if(yValuesESSsoundswitch[i] == 0)
                tbody_data += '<td>' + json_data.ESS_EQ_name.EQ1/*Alpine*/ + '</td>';
            else if(yValuesESSsoundswitch[i] == 1)
                tbody_data += '<td>' + json_data.ESS_EQ_name.EQ2/*Alternative*/ + '</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-essswitchData").html(tbody_data);

        tbody_data="";
        for(var i=0; i<xValuesBoost.length;i++){
            tbody_data += '<tr>';
            tbody_data += '<td>'+ xValuesBoost[i] +'</td>';
            if(yValuesBoost[i] == "01")
                tbody_data += '<td>' + json_data.Boost_status.status1/*Activated*/ + '</td>';
            else if(yValuesBoost[i] == "04")
                tbody_data += '<td>' + json_data.Boost_status.status2/*Deactivated*/ + '</td>';
            tbody_data += '</tr>';
        }
        $(".tbody-boostData").html(tbody_data);

        tbody_data="";
        
        new Chart("line-chart-rpm", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    data: yValues,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false}
            }
        });

        new Chart("line-chart-rl-rpm", {
            type: "line",
            data: {
                labels: xValuesRELRPM,
                datasets: [{
                    data: yValuesRELRPM,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false}
            }
        });

        new Chart("line-chart-rr-rpm", {
            type: "line",
            data: {
                labels: xValuesRERRPM,
                datasets: [{
                    data: yValuesRERRPM,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false}
            }
        });

        new Chart("line-chart-torque", {
            type: "line",
            data: {
                labels: xValuesTor,
                datasets: [{
                    data: yValuesTor,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false}
            }
        });

        new Chart("line-chart-rl-torque", {
            type: "line",
            data: {
                labels: xValuesRELTor,
                datasets: [{
                    data: yValuesRELTor,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false}
            }
        });

        new Chart("line-chart-rr-torque", {
            type: "line",
            data: {
                labels: xValuesRERTor,
                datasets: [{
                    data: yValuesRERTor,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false}
            }
        });

        new Chart("line-chart-global-torque", {
            type: "line",
            data: {
                labels: xValuesGlobalTor,
                datasets: [{
                    data: yValuesGlobalTor,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false}
            }
        });

        new Chart("line-chart-pedal", {
            type: "line",
            data: {
                labels: xValuesPedal,
                datasets: [{
                    data: yValuesPedal,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false}
            }
        });

        new Chart("line-chart-speed", {
            type: "line",
            data: {
                labels: xValuesspeed,
                datasets: [{
                    data: yValuesspeed,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false}
            }
        });

        new Chart("line-chart-acc", {
            type: "line",
            data: {
                labels: xValuesacc,
                datasets: [{
                    data: yValuesacc,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false}
            }
        });

        new Chart("line-chart-lc", {
            type: "line",
            data: {
                labels: xValuesLC,
                datasets: [{
                    data: yValuesLC,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function(value, index, values) {
                                // for a value (tick) equals to 8
                                return yLabelsLC[value];
                                // 'junior-dev' will be returned instead and displayed on your chart
                            }
                        }
                    }]
                }
            }
        });

        new Chart("line-chart-essfeatureenable", {
            type: "line",
            data: {
                labels: xValuesEnable,
                datasets: [{
                    data: yValuesEnable,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function(value, index, values) {
                                // for a value (tick) equals to 8
                                return yLabelsFeatureESS[value];
                                // 'junior-dev' will be returned instead and displayed on your chart
                            }
                        }
                    }]
                }
            }
        });

        new Chart("line-chart-essvolume", {
            type: "line",
            data: {
                labels: xValuesVol,
                datasets: [{
                    data: yValuesVol,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function(value, index, values) {
                                // for a value (tick) equals to 8
                                return yLabelsESSVolume[value];
                                // 'junior-dev' will be returned instead and displayed on your chart
                            }
                        }
                    }]
                }
            }
        });

        new Chart("line-chart-essswitch", {
            type: "line",
            data: {
                labels: xValuesESSsoundswitch,
                datasets: [{
                    data: yValuesESSsoundswitch,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function(value, index, values) {
                                // for a value (tick) equals to 8
                                return yLabels[value];
                                // 'junior-dev' will be returned instead and displayed on your chart
                            }
                        }
                    }]
                }
            }
        });

        new Chart("line-chart-boost", {
            type: "line",
            data: {
                labels: xValuesBoost,
                datasets: [{
                    data: yValuesBoost,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function(value, index, values) {
                                // for a value (tick) equals to 8
                                return yLabelsBoost[value];
                                // 'junior-dev' will be returned instead and displayed on your chart
                            }
                        }
                    }]
                }
            }
        });

        new Chart("line-chart-theme", {
            type: "line",
            data: {
                labels: xValuesTheme,
                datasets: [{
                    data: yValuesTheme,
                    borderColor: "red",
                    fill: true,
                    //backgroundColor: "red"
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function(value, index, values) {
                                // for a value (tick) equals to 8
                                return yLabelsTheme[value];
                                // 'junior-dev' will be returned instead and displayed on your chart
                            }
                        }
                    }]
                }
            }
        });

        $('#err_cnt').text(err_cnt);
        $('#eqswitch_cnt').text(audioEqListcnt);
        $('#spkrfail_cnt').text(speakerFailureListcnt);
        $('#variant_cnt').text(variantCar);

        $('.tbody-error').html(tbody_error);
        $('.tbody-spkrfailure').html(tbody_speakerfail);
        $('.tbody-eqswitch').html(tbody_eqswitch);
        $('.tbody-variant').html(tbody_variant);
        $('.tbody').html(tbody);

        $('.dataTable').DataTable({
            "destroy": true,
            "retrieve": true,
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "info": true,
            "autoWidth": false,
            "responsive": true
        });
    };

    reader.readAsArrayBuffer(oFile);

}


/*****************************************************************************************************************************************/

function onesComplement(number) {
    //console.log(number)
    var binaryString = number.toString(2); // Convert to binary string
    //console.log((parseInt(binaryString, 2)-1).toString(2))
    binaryString = (parseInt(binaryString, 2)-1).toString(2);
    const complementedString = binaryString.replace(/[01]/g, (match) => { // Use replace with callback
        return match === '0' ? '1' : '0';
    });
    return parseInt(complementedString, 2); // Convert back to decimal
}
