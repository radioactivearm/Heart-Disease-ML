console.log('loaded insertHEART.js');


const jane = [32, 0, 2, 115, 228, 1, 1, 80, 0, 0, 1];

function insertJane() {

        let ids = ['id1', 'id2', 'id3', 'id4', 'id5', 'id6', 'id7', 'id8', 'id9', 'id10', 'id11'];

        const len = jane.length;

        for (let i = 0; i < len; i++) {
            document.getElementById(ids[i]).value = jane[i];
        }

}


function insertHEART() {



    let clinic = [];


    d3.csv('/static/data/cut.csv').then(patients => {

        // console.log(patients.length);

        // clinic.push([patients.age, patients.sex, patients['chest pain type'], patients['resting bp s'], patients.cholesterol, patients['fasting blood sugar'],
        //         patients['resting ecg'], patients['max heart rate'], patients['exercise angina'], patients.oldpeak, patients['ST slope']]);

        patients.forEach(patient => {
            clinic.push([patient.age, patient.sex, patient['chest pain type'], patient['resting bp s'], patient.cholesterol, patient['fasting blood sugar'],
                    patient['resting ecg'], patient['max heart rate'], patient['exercise angina'], patient.oldpeak, patient['ST slope']]);
        });
        
        // https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
        let patient = clinic[Math.floor(Math.random()*clinic.length)];
        // let patient = clinic[0];

        // console.log(clinic[0]);
    
        let ids = ['id1', 'id2', 'id3', 'id4', 'id5', 'id6', 'id7', 'id8', 'id9', 'id10', 'id11'];
    
        const len = patient.length;
    
        for (let j = 0; j < len; j++) {
            document.getElementById(ids[j]).value = patient[j];
        }
    });
    // console.log(clinic);

}


function colorResult() {
    // let handle = d3.select('#pred');
    

    let handle = document.getElementById("pred")


    console.log('this is running');

    console.log(handle.textContent);

    if (handle.textContent.includes('Does')) {
        handle.style.backgroundColor = '#90EE90';
    } else {
        handle.style.backgroundColor = '#e03a3db4';
    }

    // if (handle.text().includes('Does')) {
    //     handle.classed('nResult', false).classed('pResult', true);
    // } else {
    //     handle.classed('pResult', false).classed('nResult', true);
    // }

    // console.log(handle.attr('class'));
}

colorResult();