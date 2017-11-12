var OpenalprApi = require('openalpr_api');

var api = new OpenalprApi.DefaultApi()

var exportedImage = require('var').imageBytes;

var secretKey = "sk_83a52ce96a411b36a8ba0957"; // {String} The secret key used to authenticate your account.  You can view your  secret key by visiting  https://cloud.openalpr.com/

var country = "us"; // {String} Defines the training data used by OpenALPR.  \"us\" analyzes  North-American style plates.  \"eu\" analyzes European-style plates.  This field is required if using the \"plate\" task  You may use multiple datasets by using commas between the country  codes.  For example, 'au,auwide' would analyze using both the  Australian plate styles.  A full list of supported country codes  can be found here https://github.com/openalpr/openalpr/tree/master/runtime_data/config

var opts = {
    'recognizeVehicle': 0, // {Integer} If set to 1, the vehicle will also be recognized in the image This requires an additional credit per request
    'state': "", // {String} Corresponds to a US state or EU country code used by OpenALPR pattern  recognition.  For example, using \"md\" matches US plates against the  Maryland plate patterns.  Using \"fr\" matches European plates against  the French plate patterns.
    'returnImage': 0, // {Integer} If set to 1, the image you uploaded will be encoded in base64 and  sent back along with the response
    'topn': 1, // {Integer} The number of results you would like to be returned for plate  candidates and vehicle classifications
    'prewarp': "" // {String} Prewarp configuration is used to calibrate the analyses for the  angle of a particular camera.  More information is available here http://doc.openalpr.com/accuracy_improvements.html#calibration
};



var finaldata;

function doCall(callback) {
    api.recognizeBytes(exportedImage, secretKey, country, opts, function(error, data, response) {
        if (error) {
            console.error(error);
        } else {
            console.log('API called successfully. Returned data: ' + data);
            if (data.results.length == 0) {
                console.error("No results");
            } else {
                result = data.results[0];
                plate_region = data.results[0].region;
                plate_no = data.results[0].plate;
                plate_coord = data.results[0].coordinates;
                return callback(result);
            }
        }
    });
}

doCall (function(data) {
    console.log(data);
})
