console.log('loaded insertHEART.js');

// This function insertJane works with the Jane Doe button to insert jane doe's test results into the form

const jane = [32, 0, 2, 115, 228, 1, 1, 80, 0, 0, 1];

function insertJane() {

        // an array of the id's  of the form
        let ids = ['id1', 'id2', 'id3', 'id4', 'id5', 'id6', 'id7', 'id8', 'id9', 'id10', 'id11'];

        const len = jane.length;

        // looping through the ids of the form and assigning the numbers from jane (jane doe's test results)
        // to the value of the form
        for (let i = 0; i < len; i++) {
            document.getElementById(ids[i]).value = jane[i];
        }

}

// this function works with the examples button to insert random data into
function insertHEART() {


    // setting an empty array
    let clinic = [];

    // reading the csv cleaned to be the right format to go into the model
    d3.csv('/static/data/cut.csv').then(patients => {

        // console.log(patients.length);

        // clinic.push([patients.age, patients.sex, patients['chest pain type'], patients['resting bp s'], patients.cholesterol, patients['fasting blood sugar'],
        //         patients['resting ecg'], patients['max heart rate'], patients['exercise angina'], patients.oldpeak, patients['ST slope']]);

        // The rest of the function needs the data to be in an array of arrays, so this puts it into that form
        patients.forEach(patient => {
            clinic.push([patient.age, patient.sex, patient['chest pain type'], patient['resting bp s'], patient.cholesterol, patient['fasting blood sugar'],
                    patient['resting ecg'], patient['max heart rate'], patient['exercise angina'], patient.oldpeak, patient['ST slope']]);
        });
        
        // selecting a random array
        // https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
        let patient = clinic[Math.floor(Math.random()*clinic.length)];
        // let patient = clinic[0];

        // console.log(clinic[0]);
    
        // an array of ids for the form
        let ids = ['id1', 'id2', 'id3', 'id4', 'id5', 'id6', 'id7', 'id8', 'id9', 'id10', 'id11'];
    
        const len = patient.length;
    
        // looping through form and assigning new values to each element
        for (let j = 0; j < len; j++) {
            document.getElementById(ids[j]).value = patient[j];
        }
    });
    // console.log(clinic);

}

// this function changes the background of the prediction result based on the result
function colorResult() {
    // let handle = d3.select('#pred');
    
    // grabbing a hold of element
    let handle = document.getElementById("pred")


    console.log('this is running');

    console.log(handle.textContent);

    // if it is a negative, color green
    if (handle.textContent.includes('Does')) {
        handle.style.backgroundColor = '#90EE90';
    } else {
        // positive color red
        handle.style.backgroundColor = '#e03a3db4';
    }

    // if (handle.text().includes('Does')) {
    //     handle.classed('nResult', false).classed('pResult', true);
    // } else {
    //     handle.classed('pResult', false).classed('nResult', true);
    // }

    // console.log(handle.attr('class'));
}

// will call colorResult every time the page refreshs, which happens everytime the prediction changes.
colorResult();