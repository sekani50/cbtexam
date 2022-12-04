// JavaScript source code


/////////////////FETCH//////////////////////////

const questArr = [];

function fetchQuestion(questName) {

    //emptying the array everytime the fn is called
    questArr.splice(0, questArr.length);


    fetch(`https://questions.aloc.com.ng/api/v2/q/15?subject=${questName}`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AccessToken': 'QB-7499c2df1f6faf59826f'
            },
            method: "GET",
        })
        .then((resp) => {

            if (!resp.ok) {
                console.log("Problem dey o");
            }

            return resp.json()
        })
        .then(function (res) {
            questArr.push(res.data);
            console.log(res)
        })
        .catch(function (res) { console.log(res) })
}


console.log(questArr);


const slicedQuest = {};

let allsubject = document.querySelectorAll('.each-subject');

allsubject.forEach((eachsubject) => {

    eachsubject.addEventListener('click', () => {



        document.getElementById("sel-container").style.display = "none";

        let instBox = document.getElementById("inst-container");
        instBox.style.display = "block";


        let subjectName = eachsubject.children[1].innerText.toLowerCase();
        console.log(subjectName);

        changeBackgroundColor(subjectName, instBox.children[0]);



        if (subjectName === "biology") {

            fetchQuestion("biology");

        } else if (subjectName === "physics") {

            fetchQuestion("physics");
        } else {

            fetchQuestion("chemistry");
        }


        //console.log(eachsubject.children[1].innerText.toLowerCase());

        document.getElementById("start").addEventListener('click', () => {
            document.getElementById("inst-container").style.display = "none";


            let questBox = document.getElementById("quest-container");
            questBox.style.display = "block";

            let subName = document.getElementById("subject-name");

            subName.innerHTML = "";

            subName.innerHTML = subjectName.toUpperCase();

            changeBackgroundColor(subjectName, questBox.children[0]);


            let future = new Date(new Date().getTime() + 182000);

            setTimeout(countDown(future), 1000);
            setTimeout(firstQuestDisplay, 2000);
            setTimeout(buttons, 2000);
        })


        //console.log(refinedQuest);



    })

})

const a = 'a', b = 'b', c = 'c', d = 'd', e = 'e';

//const getOptions = [a, b, c, d,e];

//////////////////Display first question on load///////////////////
let count = 0;
function firstQuestDisplay() {



    questArr.forEach((val) => {

        //console.log(val[0].id);

        //console.log(val[0].answer);
        //console.log("keys " + Object.keys(val[0].option));

        displayQuestContent(
            count + 1,
            val[0].question,
            val[0].option.a !== "" ? val[0].option.a : "None",
            val[0].option.b !== "" ? val[0].option.b : "None",
            val[0].option.c !== "" ? val[0].option.c : "None",
            val[0].option.d !== "" ? val[0].option.d : "None",
            val[0].option.e !== "" ? val[0].option.e : "None"
        )




    })
}




let displayBox = document.getElementById("display-box");

function htmlElementCreator(el) {

    let parser = new DOMParser()

    let doc = parser.parseFromString(el, 'text/html');

    return doc.body.childNodes[0];
}
/// questions html handler ////////////////

function displayQuestContent(qn, quest, optionA, optionB, optionC, optionD, optionE) {

    displayBox.innerHTML = "";

    let pTagB = document.createElement("p");
    let pTagTextB = document.createTextNode("Q" + qn);

    pTagB.appendChild(pTagTextB);

    let pTag = document.createElement("p");

    let pTagText = document.createTextNode(quest);

    pTag.appendChild(pTagText);


    /////////ANSWERS////////////////////
    //A

    let firstAnswer = htmlElementCreator("<input type='checkbox' class='check' value='A' id='first' onclick='selectOnly(this);selAnswer(" + a + ")' name='option'>");
    let firstAnsText = htmlElementCreator("<label for='first'></label>");
    firstAnsText.innerHTML = optionA;

    displayBox.appendChild(pTagB);
    displayBox.appendChild(pTag);

    displayBox.appendChild(firstAnswer);
    displayBox.appendChild(firstAnsText);
    displayBox.appendChild(document.createElement("br"));

    //B
    let secondAnswer = htmlElementCreator("<input type='checkbox' class='check' value='B' id='second' onclick='selectOnly(this);selAnswer(" + b + ")' name='option'>");
    let secondAnsText = htmlElementCreator("<label for='second'></label><br>");
    secondAnsText.innerHTML = optionB;

    displayBox.appendChild(secondAnswer);
    displayBox.appendChild(secondAnsText);
    displayBox.appendChild(document.createElement("br"));


    //C
    let thirdAnswer = htmlElementCreator("<input type='checkbox' class='check' value='C' id='third' onclick='selectOnly(this);selAnswer(" + c + ")' name='option'>");
    let thirdAnsText = htmlElementCreator("<label for='third'></label>");
    thirdAnsText.innerHTML = optionC;

    displayBox.appendChild(thirdAnswer);
    displayBox.appendChild(thirdAnsText);
    displayBox.appendChild(document.createElement("br"));


    //D
    let forthAnswer = htmlElementCreator("<input type='checkbox' class='check' value='D' id='forth' onclick='selectOnly(this);selAnswer(" + d + ")' name='option'>");
    let forthAnsText = htmlElementCreator("<label for='forth'></label>");
    forthAnsText.innerHTML = optionD;

    displayBox.appendChild(forthAnswer);
    displayBox.appendChild(forthAnsText);
    displayBox.appendChild(document.createElement("br"));


    //E
    let fifthAnswer = htmlElementCreator("<input type='checkbox' class='check' value='E' id='fifth' onclick='selectOnly(this);selAnswer(" + e + ")' name='option'>");
    let fifthAnsText = htmlElementCreator("<label for='fifth'></label>");
    fifthAnsText.innerHTML = optionE;

    displayBox.appendChild(fifthAnswer);
    displayBox.appendChild(fifthAnsText);
    displayBox.appendChild(document.createElement("br"));

}


////////////////////NEXT AND PREVIOUS////////////////////////
//let count = 0;

document.getElementById("next").addEventListener('click', nextButton)


function nextButton(event) {

    event.preventDefault();
    document.getElementById("previous").removeAttribute("style", "pointer-events:none");

    let displayBox = document.getElementById("display-box")
    displayBox.innerHTML = "";

    //console.log("b4 addition in next btn " + count);

    count++;
    console.log(count);

    questArr.forEach((val) => {



        if (count < val.length) {
            console.log(val[count]);

            displayQuestContent(
                count + 1,
                val[count].question,
                val[count].option.a !== "" ? val[count].option.a : "None",
                val[count].option.b !== "" ? val[count].option.b : "None",
                val[count].option.c !== "" ? val[count].option.c : "None",
                val[count].option.d !== "" ? val[count].option.d : "None",
                val[count].option.e !== "" ? val[count].option.e : "None"
            )


            if ((count + 1) >= val.length) {

                //console.log("from next b4 disabling code line " + val.length);

                document.getElementById("next").setAttribute("style", "pointer-events:none");
            }
            else {

                document.getElementById("next").removeAttribute("style", "pointer-events:none");
            }

        }
        else {
            document.getElementById("next").setAttribute("style", "pointer-events:none");

        }

    })




}




document.getElementById("previous").addEventListener('click', previousButton)

function previousButton(event) {
    event.preventDefault();

    document.getElementById("display-box").innerHTML = "";


    count--;

    questArr.forEach((val) => {


        //console.log(count);

        if ((count < val.length) & count !== -1) {

            console.log(val[count]);
            displayQuestContent(
                count + 1,
                val[count].question,
                val[count].option.a !== "" ? val[count].option.a : "None",
                val[count].option.b !== "" ? val[count].option.b : "None",
                val[count].option.c !== "" ? val[count].option.c : "None",
                val[count].option.d !== "" ? val[count].option.d : "None",
                val[count].option.e !== "" ? val[count].option.e : "None"
            )
            if (count == 0) {
                document.getElementById("previous").setAttribute("style", "pointer-events:none");

            } else if (count < val.length) {
                document.getElementById("next").removeAttribute("style", "pointer-events:none");

            }
        }
        else {
            count = 0;
            document.getElementById("previous").setAttribute("style", "pointer-events:none");

        }
        //console.log("from previous " + count);

    })


}

function buttons() {
    ////////////show question number button///////////
    let btnBox = document.getElementById("btn-box");


    btnBox.innerHTML = "";

    questArr.forEach((val) => {
        val.forEach((v, idx) => {

            //console.log(v.id);
            let newId = idx + 1;

            let btns = document.createElement("button");
            btns.setAttribute("id", "num-btn");
            btns.setAttribute("class", "selected");
            btns.setAttribute("onclick", "displayQuest(" + newId + ")")

            let num = document.createTextNode(idx + 1);

            btns.appendChild(num);

            btnBox.appendChild(btns);
        })
    })

}


/////////////////////display the question number of the button clicked /////////////////////////

function displayQuest(questID) {

    event.preventDefault();


    let displayBox = document.getElementById("display-box");

    displayBox.innerHTML = "";

    questArr.forEach((val) => {


        val.forEach((v, index) => {
            let newIdx = index + 1



            if (newIdx == questID) {
                console.log(v);

                count = newIdx - 1;

                console.log("from the buttons " + count)

                displayQuestContent(
                    count + 1,
                    v.question,
                    v.option.a !== "" ? v.option.a : "None",
                    v.option.b !== "" ? v.option.b : "None",
                    v.option.c !== "" ? v.option.c : "None",
                    v.option.d !== "" ? v.option.d : "None",
                    v.option.e !== "" ? v.option.e : "None"
                )

            }

            if ((count + 1) >= val.length) {

                //console.log("from buttons b4 disabling code line " + val.length);

                document.getElementById("next").setAttribute("style", "pointer-events:none");
            }
            else {

                document.getElementById("next").removeAttribute("style", "pointer-events:none");
            }


            if (count == 0) {

               // console.log("from buttons b4 disabling code line " + val.length);

                document.getElementById("previous").setAttribute("style", "pointer-events:none");

            }
            else {
                document.getElementById("previous").removeAttribute("style", "pointer-events:none");
            }


        })

    })



}

////Handling corrrect score and others

const correctScore = [];
const slicedCorrect = {};


const allScore = [];
const slicedAll = {};


let score = 1;
function selAnswer(sel) {

    const getOptions = [];

    //let's get all the options
    questArr.forEach((val) => {

        getOptions.push(Object.keys(val[count].option));

    });

    // then give them deserved scores
    questArr.forEach((val) => {

        
        if (val[count].answer == sel) {

            
            correctScore.push({ ID: val[count].id, Score: score })

            allScore.push({ ID: val[count].id, Score: score })
        }
        else if (getOptions[0].includes(sel)) {
            //console.log("err");

            allScore.push({ ID: val[count].id, Score: 0 })
        }


    })

    //return the last array of the duplicate
    for (const item of allScore) {
        slicedAll[item.ID] = item;
    }
    const newArray = Object.values(slicedAll);
    //console.log(newArray);

    for (const item of correctScore) {
        slicedCorrect[item.ID] = item;
    }
    const newestArray = Object.values(slicedCorrect);
    //console.log(newestArray);

    ////styling answered question button and showing number of answered
    let numBtn = document.querySelectorAll(".selected");

    Array.prototype.forEach.call(numBtn, (element) => {


        if ((count + 1) == element.innerHTML) {
            element.style.background = "rgba(7,41,78)";

            document.getElementById("num").innerHTML = newArray.length + " of 15";
        }
    })
    //console.log(val[count]);

    return { newArray, newestArray };

}




///////////////////submit button /////////////////
document.getElementById("submit").addEventListener('click', (event) => {


    event.preventDefault();

    const noVal = []
    questArr.forEach((val) => {

        noVal.push(val.length);


    })

    let arrays = selAnswer();

  
    if ((arrays.newArray.length) !== noVal[0]) {

        document.body.classList.add('only-dialog');

        alertBox(`You have attempted ${arrays.newArray.length} out of ${noVal[0]}`);

        document.querySelector('dialog').setAttribute("open", true);

    }
    else {
        ///You have answered all///////////
        let sum = 0;
        arrays.newestArray.forEach((scor) => {

            //let scores = scor.Score;
            //console.log(scores);

            sum = sum + scor.Score;
        })

        console.log((sum / noVal[0]) * 100);

        document.getElementById("analysis").style.display = "block";

        document.getElementById("number").innerHTML = Math.floor((sum / noVal[0]) * 100) + "%";


        document.getElementById("submit").setAttribute("style", "display:none");
        //console.log(scores);
    }

})

///////////////////////ALERT FUNCTION /////////////////////////////

function alertBox(message) {

    let box = document.getElementById("alert-div");

    box.innerHTML = "";

    let pTag = document.createElement("p");

    let pText = document.createTextNode(message);

    pTag.appendChild(pText);
    box.appendChild(pTag);



}

//remove dialog
function removeDialog() {


    document.body.classList.remove('only-dialog');
    document.querySelector('dialog').removeAttribute("open");

    let time = document.getElementById("time-handler");

    let arrays = selAnswer();

    const noVal = []
    questArr.forEach((val) => {

        noVal.push(val.length);


    })

    if (time.innerHTML == "00:00") {

        let sum = 0;
        arrays.newestArray.forEach((scor) => {

          
            sum = sum + scor.Score;
        })
       
        document.getElementById("analysis").style.display = "block";

        document.getElementById("number").innerHTML = Math.floor((sum / noVal[0]) * 100) + "%";

        document.getElementById("submit").setAttribute("style", "display:none");
    }
}


///////////COUNTDOWN/////////////////////////

//let future = new Date(new Date().getTime() + 185000);

function countDown(future) {

    document.getElementById("time-handler").style.color = "black";

    let interval = setInterval(function setTimer() {



        let currentTime = new Date().getTime();


        let timeleft = future - currentTime;

        let min = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));

        let sec = Math.floor((timeleft % (1000 * 60)) / 1000);


        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {

            sec = "0" + sec;
        }

        document.getElementById("time-handler").innerHTML = min + ":" + sec;

        if (timeleft < 0) {
            clearInterval(interval);
            document.getElementById("time-handler").innerHTML = "00:00";

            document.body.classList.add('only-dialog');

            alertBox("Your time is up \n Click 'OK' to submit ");

            document.querySelector('dialog').setAttribute("open", true);


        }

    }, 1000);


}


/////////////MESSING AROUND WITH TIME /////////////
let timeDisplay = document.getElementById("time-handler");
let submitBtn = document.getElementById("submit");


///display submit button
setTimeout(() => {
    submitBtn.removeAttribute("style", "display:none");
}, 60000);

///change time count color
setTimeout(() => {
    timeDisplay.style.color = "red";
}, 120000);



document.getElementById("menu-bar").addEventListener('click', function () {


    let sub = document.getElementById("hpage-box");
    //sub.style.display = "block";

    if (sub.style.display === "block") {
        sub.style.display = "none";

    }
    else {

        sub.style.display = "block";

    }


})
///////////check only one/////////////

function selectOnly(opt) {

    let options = document.getElementsByName("option");

    Array.prototype.forEach.call(options, (element) => {

        element.checked = false;
    });

    opt.checked = true;
}



function changeBackgroundColor(sub, div) {
    if (sub === "biology") {
        div.style.background = "rgba(88, 75, 237)";

        console.log("yeah");


    } else if (sub === "physics") {


        div.style.background = "rgba(255, 121, 83)";
    } else {

        div.style.background = "rgba(7,41,78)";
    }
}

document.getElementById("back").addEventListener('click', () => {

    document.getElementById("inst-container").style.display = "none";

    questArr.splice(0, questArr.length);


    document.getElementById("sel-container").style.display = "block";
})


document.getElementById("another-test").addEventListener('click', () => {
    document.getElementById("analysis").style.display = "none";
    document.getElementById("quest-container").style.display = "none";

    document.getElementById("sel-container").style.display = "block";
})

