console.log('loaded insertHEART.js');


// const patients = [
//     [57, 1, 2, 124, 261, 0, 0, 141, 0, 0.3, 1],
//     [43, 1, 4, 115, 303, 0, 0, 181, 0, 1.2, 2],
//     [42, 0, 3, 120, 209, 0, 0, 173, 0, 0.0, 2],
//     [67, 1, 4, 120, 237, 0, 0, 71, 0, 1.0, 2],
//     [71, 0, 2, 160, 302, 0, 0, 162, 0, 0.4, 1]
// ];

// function insertHEART() {

//         // https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
//         let patient = patients[Math.floor(Math.random()*patients.length)];

//         let ids = ['id1', 'id2', 'id3', 'id4', 'id5', 'id6', 'id7', 'id8', 'id9', 'id10', 'id11'];

//         const len = patient.length;

//         for (let i = 0; i < len; i++) {
//             document.getElementById(ids[i]).value = patient[i];
//         }


// }


function insertHEART() {



    let clinic = [];


    d3.csv('/static/data/cut.csv', patients => {

        // console.log(patients.length);

        clinic.push([patients.age, patients.sex, patients['chest pain type'], patients['resting bp s'], patients.cholesterol, patients['fasting blood sugar'],
                patients['resting ecg'], patients['max heart rate'], patients['exercise angina'], patients.oldpeak, patients['ST slope']]);
        
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